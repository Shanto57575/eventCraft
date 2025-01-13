const EditEventModal = ({
	selectedEvent,
	setSelectedEvent,
	handleEditSubmit,
	handleImageChange,
	handleCloseModal,
	isSubmitting,
}) => {
	return (
		<dialog id="edit_modal" className="modal">
			<div className="fixed inset-0 overflow-y-auto p-2 sm:p-4 md:p-6">
				<div className="flex min-h-full items-center justify-center">
					<div className="relative w-full max-w-5xl mx-auto bg-white rounded-lg shadow-xl">
						<div className="p-3 sm:p-4 md:p-6">
							<div className="flex items-center justify-between mb-4 sm:mb-6">
								<h3 className="text-xl sm:text-2xl font-semibold">
									Edit Event
								</h3>
								<button
									type="button"
									className="text-gray-400 hover:text-gray-500"
									onClick={handleCloseModal}
								>
									<span className="sr-only">Close</span>
									<svg
										className="h-5 w-5 sm:h-6 sm:w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>

							<form
								onSubmit={handleEditSubmit}
								className="space-y-4 sm:space-y-6"
							>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
									<div className="sm:col-span-2">
										<label
											htmlFor="name"
											className="block text-sm font-medium text-gray-700"
										>
											Event Name <span className="text-red-500">*</span>
										</label>
										<input
											required
											value={selectedEvent?.name || ""}
											onChange={(e) =>
												setSelectedEvent({
													...selectedEvent,
													name: e.target.value,
												})
											}
											id="name"
											type="text"
											className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
											placeholder="Enter event name"
										/>
									</div>
									<div className="sm:col-span-2">
										<label
											htmlFor="description"
											className="block text-sm font-medium text-gray-700"
										>
											Event Description <span className="text-red-500">*</span>
										</label>
										<textarea
											required
											value={selectedEvent?.description || ""}
											onChange={(e) =>
												setSelectedEvent({
													...selectedEvent,
													description: e.target.value,
												})
											}
											id="description"
											rows={3}
											className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
											placeholder="Describe your event"
										/>
									</div>
									<div>
										<label
											htmlFor="date"
											className="block text-sm font-medium text-gray-700"
										>
											Event Date <span className="text-red-500">*</span>
										</label>
										<input
											required
											value={
												selectedEvent?.date
													? new Date(selectedEvent.date)
															.toISOString()
															.split("T")[0]
													: ""
											}
											onChange={(e) =>
												setSelectedEvent({
													...selectedEvent,
													date: e.target.value,
												})
											}
											id="date"
											type="date"
											className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
										/>
									</div>
									<div>
										<label
											htmlFor="category"
											className="block text-sm font-medium text-gray-700"
										>
											Category <span className="text-red-500">*</span>
										</label>
										<select
											required
											value={selectedEvent?.category || ""}
											onChange={(e) =>
												setSelectedEvent({
													...selectedEvent,
													category: e.target.value,
												})
											}
											id="category"
											className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
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
									</div>
									<div>
										<label
											htmlFor="status"
											className="block text-sm font-medium text-gray-700"
										>
											Status
										</label>
										<select
											value={selectedEvent?.status || "upcoming"}
											onChange={(e) =>
												setSelectedEvent({
													...selectedEvent,
													status: e.target.value,
												})
											}
											id="status"
											className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
										>
											<option value="upcoming">Upcoming</option>
											<option value="running">Running</option>
											<option value="past">Past</option>
										</select>
									</div>
									<div>
										<label
											htmlFor="image"
											className="block text-sm font-medium text-gray-700"
										>
											Event Image
										</label>
										<input
											type="file"
											onChange={handleImageChange}
											id="image"
											accept="image/*"
											className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
										/>
										<p className="mt-1 text-xs sm:text-sm text-gray-500">
											Max file size: 5MB. Supported formats: JPG, PNG, GIF
										</p>
									</div>
								</div>

								<div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
									<button
										type="button"
										onClick={handleCloseModal}
										className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									>
										Cancel
									</button>
									<button
										type="submit"
										disabled={isSubmitting}
										className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{isSubmitting ? (
											<>
												<span className="inline-block animate-spin mr-2">
													↻
												</span>
												Updating...
											</>
										) : (
											"Update Event"
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			<div
				className="modal-backdrop bg-black opacity-25"
				onClick={handleCloseModal}
			></div>
		</dialog>
	);
};

export default EditEventModal;
