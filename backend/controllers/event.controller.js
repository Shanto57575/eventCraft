import cloudinary from '../config/cloudinary.js';
import Event from '../models/event.model.js';

const createEvent = async (req, res) => {
    try {
        const { name, description, date, category, status } = req.body;
        const createdBy = req.user._id;

        if (!name || !description || !date || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let image = ""
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)
            image = result.secure_url
        }

        const eventStatus = status || 'upcoming';

        const newEvent = new Event({
            name,
            description,
            date,
            image,
            category,
            createdBy,
            status: eventStatus,
        });

        const savedEvent = await newEvent.save();
        res.status(201).json({ message: "Event created successfully", event: savedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create event", error: error.message });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const { categories, startDate, endDate } = req.query;

        let filterQuery = {};

        if (categories) {
            const categoryArray = categories.split(',');
            filterQuery.category = { $in: categoryArray };
        }

        if (startDate || endDate) {
            filterQuery.date = {};

            if (startDate) {
                filterQuery.date.$gte = new Date(startDate);
            }

            if (endDate) {
                const endDateTime = new Date(endDate);
                endDateTime.setHours(23, 59, 59, 999);
                filterQuery.date.$lte = endDateTime;
            }
        }

        const events = await Event.find(filterQuery)
            .populate('createdBy', 'name email')
            .populate('attendees', 'name email')
            .sort({ date: 1 });

        res.status(200).json({
            events,
            totalCount: events.length,
            filters: {
                appliedCategories: categories ? categories.split(',') : [],
                dateRange: {
                    startDate: startDate || null,
                    endDate: endDate || null
                }
            }
        });

    } catch (error) {
        console.error("Error in getAllEvents:", error);
        res.status(500).json({
            message: "Failed to fetch events",
            error: error.message
        });
    }
};

const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id)
            .populate('createdBy', 'name email')
            .populate('attendees', 'name email');

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({ event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch event", error: error.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, date, category, status } = req.body;
        const userId = req.user._id;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this event" });
        }

        let image = event.image;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            image = result.secure_url;
        }

        event.name = name || event.name;
        event.description = description || event.description;
        event.date = date || event.date;
        event.category = category || event.category;
        event.status = status || event.status;
        event.image = image

        const updatedEvent = await event.save();
        res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update event", error: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this event" });
        }

        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete event", error: error.message });
    }
};

const attendEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user._id;

        const event = await Event.findById(eventId)
            .populate('attendees', 'name email'); // Populate attendee details

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.attendees.some(attendee => attendee._id.toString() === userId.toString())) {
            return res.status(400).json({ message: "You are already attending this event" });
        }

        event.attendees.push(userId);
        await event.save();

        const updatedEvent = await Event.findById(eventId)
            .populate('attendees', 'name email');

        const io = req.app.get('io');

        io.to(`event-${eventId}`).emit('attendeeUpdate', {
            eventId: eventId,
            attendeeCount: updatedEvent.attendees.length,
            attendees: updatedEvent.attendees
        });

        res.status(200).json({
            message: "Successfully joined the event",
            attendees: updatedEvent.attendees
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    attendEvent,
};
