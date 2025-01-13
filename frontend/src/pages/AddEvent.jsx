import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const AddEvent = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const [loading, setLoading] = useState(false);
	const { currentUser: authUser } = useAuth();

	const currentUser =
		authUser || JSON.parse(localStorage.getItem("user")) || {};

	const onSubmit = async (data) => {
		if (currentUser?.isGuest) {
			toast.error(
				<h1 className="text-center">Please register to create Event</h1>
			);
			return;
		}
		setLoading(true);
		const formData = new FormData();

		formData.append("name", data.name);
		formData.append("description", data.description);
		formData.append("date", data.date);
		formData.append("category", data.category);
		formData.append("status", data.status);

		if (data.image[0]) {
			formData.append("image", data.image[0]);
		}

		const token = localStorage.getItem("token");

		try {
			const response = await axiosInstance.post(
				"/api/event/create-event",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response) {
				toast.success(response?.data?.message);
				reset();
			}
		} catch (error) {
			console.error("Error creating event:", error);
			toast.error(error.response?.data?.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen p-6">
			<div className="max-w-3xl mx-auto rounded-xl shadow-sm border border-slate-100 p-8">
				<h2 className="text-3xl font-semibold text-center mb-8">
					Create Event
				</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-2">
						<label htmlFor="name" className="block text-sm font-medium">
							Event Name
						</label>
						<input
							{...register("name", { required: "Event name is required" })}
							id="name"
							type="text"
							className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-colors"
							placeholder="Enter event name"
						/>
						{errors.name && (
							<p className="text-rose-500 text-sm mt-1">
								{errors.name.message}
							</p>
						)}
					</div>

					{/* Description */}
					<div className="space-y-2">
						<label htmlFor="description" className="block text-sm font-medium">
							Event Description
						</label>
						<textarea
							{...register("description", {
								required: "Event description is required",
							})}
							id="description"
							rows="4"
							className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-colors"
							placeholder="Describe your event"
						/>
						{errors.description && (
							<p className="text-rose-500 text-sm mt-1">
								{errors.description.message}
							</p>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Date */}
						<div className="space-y-2">
							<label htmlFor="date" className="block text-sm font-medium">
								Event Date
							</label>
							<input
								{...register("date", { required: "Event date is required" })}
								id="date"
								type="date"
								className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-colors"
							/>
							{errors.date && (
								<p className="text-rose-500 text-sm mt-1">
									{errors.date.message}
								</p>
							)}
						</div>

						{/* Category */}
						<div className="space-y-2">
							<label htmlFor="category" className="block text-sm font-medium">
								Category
							</label>
							<select
								{...register("category", {
									required: "Event category is required",
								})}
								id="category"
								className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-colors"
							>
								<option value="">Select a category</option>
								<option value="Music">Music</option>
								<option value="Workshop">Workshop</option>
								<option value="Sports">Sports</option>
								<option value="Networking">Networking</option>
								<option value="Education">Education</option>
								<option value="Conference">Conference</option>
								<option value="Meetup">Meetup</option>
								<option value="Party">Party</option>
							</select>
							{errors.category && (
								<p className="text-rose-500 text-sm mt-1">
									{errors.category.message}
								</p>
							)}
						</div>
					</div>

					{/* Status */}
					<div className="space-y-2">
						<label htmlFor="status" className="block text-sm font-medium">
							Status
						</label>
						<select
							{...register("status", { required: "Event status is required" })}
							id="status"
							className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-colors"
						>
							<option value="upcoming">Upcoming</option>
							<option value="running">Running</option>
							<option value="past">Past</option>
						</select>
						{errors.status && (
							<p className="text-rose-500 text-sm mt-1">
								{errors.status.message}
							</p>
						)}
					</div>

					{/* Image Upload */}
					<div className="space-y-2">
						<label htmlFor="image" className="block text-sm font-medium">
							Event Image
						</label>
						<input
							{...register("image")}
							id="image"
							type="file"
							className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-colors"
						/>
						{errors.image && (
							<p className="text-rose-500 text-sm mt-1">
								{errors.image.message}
							</p>
						)}
					</div>

					<div className="pt-4">
						<button
							disabled={loading}
							type="submit"
							className="w-full border py-3 px-6 rounded-lg hover:bg-white hover:text-black duration-300"
						>
							{loading ? "creating...." : "Create Event"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddEvent;
