import EventCard from "./EventCard";

const EventList = ({
	events,
	handleEdit,
	handleDelete,
	fetchAllEvents,
	isDeleting,
}) => {
	return (
		<>
			<h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">
				{events && events.length > 0 && "All Events"}
			</h1>
			<div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{events && events.length > 0 ? (
					events.map((event) => (
						<EventCard
							key={event._id}
							event={event}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
							fetchAllEvents={fetchAllEvents}
							isDeleting={isDeleting}
						/>
					))
				) : (
					<p className="text-gray-300 text-3xl text-center">No events found</p>
				)}
			</div>
		</>
	);
};

export default EventList;
