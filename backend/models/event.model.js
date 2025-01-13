import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attendees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    category: {
        type: String,
        enum: [
            'Music',
            'Workshop',
            'Sports',
            'Networking',
            'Education',
            'Conference',
            'Meetup',
            'Party'
        ],
        required: true
    },
    status: {
        type: String,
        enum: ['past', 'upcoming', 'running'],
        default: 'upcoming',
        required: true
    },
    image: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Event = mongoose.model('Event', EventSchema);
export default Event;
