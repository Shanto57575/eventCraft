import express from 'express';
import connectToDB from './db/connectDB.js';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js';
import { errorHandler } from './middleware/errorHadling.js';
import eventRouter from './routes/event.route.js';
import cors from 'cors'
import { Server } from 'socket.io';
import { createServer } from 'http';

dotenv.config()

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 3001

app.use(cors({
    origin: ['https://eventcraft99.netlify.app', 'http://localhost:5173'],
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Join event room
    socket.on('joinEvent', (eventId) => {
        socket.join(`event-${eventId}`);
    });

    // Leave event room
    socket.on('leaveEvent', (eventId) => {
        socket.leave(`event-${eventId}`);
    });
});

app.set('io', io);

app.get('/', (req, res) => {
    res.send({ message: "Api is running Fine" })
})

app.use('/api/auth', userRouter)
app.use('/api/event', eventRouter)

app.use(errorHandler)

const startServer = async () => {
    try {
        await connectToDB()
        httpServer.listen(port, () => {
            console.log(`Event Craft listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()