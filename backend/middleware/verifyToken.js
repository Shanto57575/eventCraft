import jwt from 'jsonwebtoken'

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "unauthorize access" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded.isGuest) {
            req.user = {
                _id: decoded._id,
                name: decoded.name,
                email: decoded.email,
                isGuest: true
            };
            return next();
        }
        req.user = { _id: decoded.data };
        next();
    } catch (err) {
        console.log(err)
        res.status(403).json({ message: "You are not Logged In" });
    }
};

export default authenticate