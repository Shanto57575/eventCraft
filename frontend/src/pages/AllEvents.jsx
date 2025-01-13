import { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import useAuth from "../hooks/useAuth";
import FilterSidebar from "../components/FilterSidebar";
import EventList from "../components/EventList";
import EditEventModal from "../components/EditEventModal";

const AllEvents = () => {
	const [allEvents, setAllEvents] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [image, setImage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const currentUser = useAuth();

	const [selectedCategories, setSelectedCategories] = useState([]);
	const [dateRange, setDateRange] = useState({
		startDate: "",
		endDate: "",
	});

	const token = localStorage.getItem("token");

	const fetchAllEvents = async () => {
		try {
			setIsLoading(true);
			let url = "/api/event/all-event?";

			const params = new URLSearchParams();

			if (selectedCategories.length > 0) {
				params.append("categories", selectedCategories.join(","));
			}

			if (dateRange.startDate) {
				params.append("startDate", dateRange.startDate);
			}

			if (dateRange.endDate) {
				params.append("endDate", dateRange.endDate);
			}

			const queryString = params.toString();
			const finalUrl = queryString ? `${url}${queryString}` : url;

			const apiResponse = await axiosInstance.get(finalUrl);
			if (apiResponse) {
				setAllEvents(apiResponse.data?.events);
			}
		} catch (error) {
			toast.error("Failed to fetch events");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchAllEvents();
	}, [selectedCategories, dateRange]);

	const handleDelete = async (eventId) => {
		if (!window.confirm("Are you sure you want to delete this event?")) {
			return;
		}

		try {
			setIsDeleting(true);
			const apiResponse = await axiosInstance.delete(`/api/event/${eventId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (apiResponse) {
				toast.success(apiResponse?.data?.message);
				fetchAllEvents();
			}
		} catch (error) {
			toast.error("Failed to delete event");
			console.error(error);
		} finally {
			setIsDeleting(false);
		}
	};

	const handleEdit = async (eventId) => {
		try {
			setIsLoading(true);
			const apiResponse = await axiosInstance.get(`/api/event/${eventId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setSelectedEvent(apiResponse.data.event);
			document.getElementById("edit_modal").showModal();
		} catch (error) {
			document.getElementById("edit_modal").showModal();
			toast.error("Error fetching event details");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				toast.error("Image size should be less than 5MB");
				return;
			}
			if (!file.type.startsWith("image/")) {
				toast.error("Please upload an image file");
				return;
			}
			setImage(file);
		}
	};

	const handleEditSubmit = async (e) => {
		e.preventDefault();

		if (!selectedEvent?.name?.trim()) {
			toast.error("Event name is required");
			return;
		}
		if (!selectedEvent?.description?.trim()) {
			toast.error("Event description is required");
			return;
		}
		if (!selectedEvent?.date) {
			toast.error("Event date is required");
			return;
		}
		if (!selectedEvent?.category) {
			toast.error("Event category is required");
			return;
		}

		const formData = new FormData();
		formData.append("name", selectedEvent.name.trim());
		formData.append("description", selectedEvent.description.trim());
		formData.append("date", selectedEvent.date);
		formData.append("category", selectedEvent.category);
		formData.append("status", selectedEvent.status);

		if (image) {
			formData.append("image", image);
		}

		try {
			setIsSubmitting(true);
			const apiResponse = await axiosInstance.put(
				`/api/event/${selectedEvent._id}`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);
			toast.success(apiResponse?.data?.message);
			fetchAllEvents();
			handleCloseModal();
		} catch (error) {
			toast.error(error.response?.data?.message || "Error updating event");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCloseModal = () => {
		setSelectedEvent(null);
		setImage(null);
		document.getElementById("edit_modal").close();
	};

	const toggleSidebar = (isOpen) => {
		setIsSidebarOpen(isOpen);
	};

	if (isLoading && !allEvents.length) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader className="h-16 w-16 animate-spin text-gray-900" />
			</div>
		);
	}

	return (
		<div className="min-h-screen ml-0 md:ml-6 lg:ml-8">
			<div className="flex flex-col md:flex-row">
				<div className="sticky z-10">
					<FilterSidebar
						isSidebarOpen={isSidebarOpen}
						toggleSidebar={toggleSidebar}
						selectedCategories={selectedCategories}
						setSelectedCategories={setSelectedCategories}
						dateRange={dateRange}
						setDateRange={setDateRange}
					/>
				</div>

				<main className="mx-4 md:mx-0 md:ml-4">
					<EventList
						events={allEvents}
						currentUser={currentUser}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
						fetchAllEvents={fetchAllEvents}
						isDeleting={isDeleting}
					/>
				</main>
			</div>

			<EditEventModal
				selectedEvent={selectedEvent}
				setSelectedEvent={setSelectedEvent}
				handleEditSubmit={handleEditSubmit}
				handleImageChange={handleImageChange}
				handleCloseModal={handleCloseModal}
				isSubmitting={isSubmitting}
			/>

			{isLoading && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<Loader className="h-12 w-12 animate-spin text-white" />
				</div>
			)}
		</div>
	);
};

export default AllEvents;
