import express from 'express';
import {
    attendEvent,
    createEvent,
    deleteEvent,
    getAllEvents,
    getEventById,
    updateEvent
} from '../controllers/event.controller.js';
import authenticate from '../middleware/verifyToken.js';
import upload from '../config/fileUpload.js';

const eventRouter = express.Router();

eventRouter.post('/create-event', authenticate, upload.single('image'), createEvent)
eventRouter.post('/attend/:eventId', authenticate, attendEvent)
eventRouter.get('/all-event', getAllEvents)
eventRouter.get('/:id', getEventById)
eventRouter.put('/:id', authenticate, upload.single('image'), updateEvent)
eventRouter.delete('/:id', authenticate, deleteEvent)

export default eventRouter