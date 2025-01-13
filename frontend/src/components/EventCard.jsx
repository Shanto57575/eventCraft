import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axios";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const socket = io(import.meta.env.VITE_BACKEND_URL);

const EventCard = ({
	event,
	handleEdit,
	handleDelete,
	fetchAllEvents,
	isDeleting,
}) => {
	const authUser = useAuth();
	const [loading, setLoading] = useState(false);

	const token = localStorage.getItem("token");
	let currentUser = authUser || JSON.parse(localStorage.getItem("user")) || {};
	console.log(currentUser);

	const [attendeeCount, setAttendeeCount] = useState(event.attendees.length);
	console.log(attendeeCount);
	const isUserJoined = event.attendees.some(
		(attendee) => attendee._id === currentUser._id
	);

	useEffect(() => {
		socket.emit("joinEvent", event._id);

		socket.on("attendeeUpdate", (data) => {
			if (data.eventId === event._id) {
				setAttendeeCount(data.attendeeCount);
			}
		});

		return () => {
			socket.emit("leaveEvent", event._id);
			socket.off("attendeeUpdate");
		};
	}, [event._id]);

	const handleAttendEvent = async (eventId) => {
		if (JSON.parse(localStorage.getItem("user"))) {
			toast.error(
				<h1 className="text-center">
					Please register for full access to event features
				</h1>
			);
			return;
		}
		setLoading(true);
		try {
			const response = await axiosInstance.post(
				`/api/event/attend/${eventId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			toast.success(response.data.message || "You are now attending the event");
			fetchAllEvents();
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to attend event");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
			<div className="relative h-48">
				<img
					className="w-full h-full object-cover"
					src={event.image}
					alt={event.name}
					onError={(e) => {
						e.target.src = "/placeholder-image.jpg";
					}}
				/>
				<div className="absolute top-2 right-2">
					<span
						className={`px-3 py-1 rounded-full text-xs font-semibold ${
							event.status === "upcoming"
								? "bg-green-100 text-green-800"
								: event.status === "running"
								? "bg-yellow-100 text-yellow-800"
								: "bg-red-100 text-red-800"
						}`}
					>
						{event.status}
					</span>
				</div>
			</div>

			<div className="p-4 space-y-3">
				<h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
					{event.name}
				</h2>
				<p className="text-sm text-gray-600 line-clamp-2">
					{event.description.slice(0, 40)}....
				</p>
				<div className="space-y-1">
					<p className="text-sm text-gray-600">
						<span className="font-bold">Organizer:</span> {event.createdBy.name}
					</p>
					<p className="text-sm text-gray-600">
						<span className="font-bold">Email:</span> {event.createdBy.email}
					</p>
					<p className="text-sm text-gray-600">
						<span className="font-bold">Category:</span> {event.category}
					</p>
					<p className="text-sm text-gray-600">
						<span className="font-bold">Date:</span>{" "}
						{new Date(event.date).toLocaleDateString()}
					</p>
				</div>

				<div>
					{currentUser.name === event.createdBy.name ? (
						<div className="flex items-center justify-between pt-3">
							<button
								onClick={() => handleEdit(event._id)}
								className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-500 disabled:opacity-50"
							>
								Edit
							</button>
							<button
								onClick={() => handleDelete(event._id)}
								disabled={isDeleting}
								className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-500 disabled:opacity-50"
							>
								Delete
							</button>
						</div>
					) : (
						<div>
							<button
								onClick={() => handleAttendEvent(event._id)}
								disabled={isUserJoined}
								className={`w-full text-white px-5 rounded-md sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium ${
									isUserJoined
										? "bg-gray-500 cursor-not-allowed"
										: "bg-emerald-600 hover:bg-emerald-500"
								}`}
							>
								{isUserJoined
									? "Event Joined"
									: `${loading ? "joining...." : "Attend Event"}`}
							</button>
						</div>
					)}
					<Link
						className="border bg-blue-600 block text-center mt-3 text-white px-2 py-1.5 rounded-lg hover:bg-white hover:border hover:border-blue-600 hover:text-blue-600 duration-300"
						to={`/event-participants/${event._id}`}
					>
						Check Other Participants
					</Link>
				</div>
			</div>
		</div>
	);
};

export default EventCard;
