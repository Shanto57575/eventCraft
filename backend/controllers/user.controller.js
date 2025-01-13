import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields must be provided" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        if (savedUser) {
            return res.status(201).json({ message: "User registered successfully" });
        } else {
            return res.status(500).json({ message: "Failed to create user" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields must be provided" });
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (!process.env.JWT_SECRET_KEY) {
            return res.status(500).json({ message: "JWT Secret Key is not defined" });
        }

        const token = jwt.sign({ data: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).json({ message: "User logged in successfully", token, user: { name: existingUser.name, email: existingUser.email, id: existingUser._id } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId).select('-password')
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

const createGuestUser = async (req, res) => {
    try {
        const guestId = Math.random().toString(36).substring(2, 8);
        const guestUser = {
            _id: `guest_${guestId}`,
            name: `Guest_${guestId}`,
            email: `guest_${guestId}@temp.com`,
            isGuest: true
        };

        const token = jwt.sign(
            {
                _id: guestUser._id,
                name: guestUser.name,
                email: guestUser.email,
                isGuest: true
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            message: "Guest login successful",
            token,
            user: guestUser
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating guest session" });
    }
};

export {
    createUser,
    loginUser,
    getUser,
    createGuestUser
};
