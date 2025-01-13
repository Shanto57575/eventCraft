import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { UserRound } from "lucide-react";
import toast from "react-hot-toast";

const socket = io(import.meta.env.VITE_BACKEND_URL);

const EventParticipants = () => {
	const location = useLocation();
	const [participants, setParticipants] = useState(
		location.state?.attendees || []
	);

	useEffect(() => {
		if (location.state?.eventId) {
			socket.emit("joinEvent", location.state.eventId);

			socket.on("attendeeUpdate", (data) => {
				if (data.eventId === location.state.eventId) {
					const newParticipant = data.attendees[data.attendees.length - 1];

					if (data.attendees.length > participants.length) {
						toast.success(`${newParticipant.name} joined the event!`, {
							icon: "👋",
							duration: 3000,
						});
					}

					setParticipants(data.attendees);
				}
			});
		}

		return () => {
			if (location.state?.eventId) {
				socket.emit("leaveEvent", location.state.eventId);
				socket.off("attendeeUpdate");
			}
		};
	}, [location.state?.eventId, participants.length]);

	return (
		<div className="max-w-4xl mx-auto">
			<div>
				<div className="text-2xl font-bold text-center mb-10 mt-28">
					Event Participants ({participants.length})
				</div>
			</div>
			<div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-3">
					{participants.map((participant) => (
						<div
							key={participant._id}
							className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
						>
							<div className="bg-blue-100 p-2 rounded-full">
								<UserRound className="w-6 h-6 text-blue-600" />
							</div>
							<div>
								<h3 className="font-medium text-gray-900">
									{participant.name}
								</h3>
								<p className="text-sm text-gray-500">{participant.email}</p>
							</div>
						</div>
					))}
					{participants.length === 0 && (
						<div className="col-span-2 text-center py-8 text-gray-500">
							No participants have joined this event yet.
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default EventParticipants;
