import { useEffect, useRef } from "react";
import { Filter, Calendar } from "lucide-react";

const categories = [
	"Music",
	"Workshop",
	"Sports",
	"Networking",
	"Education",
	"Conference",
	"Meetup",
	"Party",
];

const FilterSidebar = ({
	isSidebarOpen,
	toggleSidebar,
	selectedCategories,
	setSelectedCategories,
	dateRange,
	setDateRange,
}) => {
	const sidebarRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target) &&
				!event.target.closest("button[data-sidebar-toggle]")
			) {
				toggleSidebar(false);
			}
		}

		if (isSidebarOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isSidebarOpen, toggleSidebar]);

	const handleCategoryChange = (category) => {
		setSelectedCategories((prev) => {
			if (prev.includes(category)) {
				return prev.filter((cat) => cat !== category);
			}
			return [...prev, category];
		});
	};

	const resetFilters = () => {
		setSelectedCategories([]);
		setDateRange({
			startDate: "",
			endDate: "",
		});
	};

	return (
		<>
			<button
				data-sidebar-toggle
				onClick={() => toggleSidebar(!isSidebarOpen)}
				className="fixed top-20 md:top-0 right-4 md:right-0 z-50 md:hidden bg-black border border-neutral p-2 rounded-lg shadow-md hover:bg-gray-900"
			>
				<Filter className="h-6 w-6 text-white" />
			</button>

			<aside
				ref={sidebarRef}
				className={`fixed mt-14 md:sticky top-0 left-0 min-h-screen lg:min-h-fit w-52 md:w-64 lg:w-72 bg-black border rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out z-40 
        ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0`}
			>
				<div className="p-4 space-y-6">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-bold">Filters</h2>
						<button onClick={resetFilters} className="text-sm hover:text-white">
							Reset All
						</button>
					</div>

					<div className="space-y-4">
						<h3 className="text-lg font-semibold flex items-center gap-2">
							<Filter className="h-5 w-5" />
							Categories
						</h3>
						<div className="space-y-2">
							{categories.map((category) => (
								<label key={category} className="flex items-center space-x-2">
									<input
										type="checkbox"
										checked={selectedCategories.includes(category)}
										onChange={() => handleCategoryChange(category)}
										className="rounded cursor-pointer border-gray-300 text-blue-600 focus:ring-blue-500"
									/>
									<span className="text-sm cursor-pointer">{category}</span>
								</label>
							))}
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="text-lg font-semibold flex items-center gap-2">
							<Calendar className="h-5 w-5" />
							Date Range
						</h3>
						<div className="space-y-3">
							<div>
								<label className="block text-sm font-medium mb-1">
									Start Date
								</label>
								<input
									type="date"
									value={dateRange.startDate}
									onChange={(e) =>
										setDateRange((prev) => ({
											...prev,
											startDate: e.target.value,
										}))
									}
									className="w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">
									End Date
								</label>
								<input
									type="date"
									value={dateRange.endDate}
									onChange={(e) =>
										setDateRange((prev) => ({
											...prev,
											endDate: e.target.value,
										}))
									}
									className="w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								/>
							</div>
						</div>
					</div>
				</div>
			</aside>
		</>
	);
};

export default FilterSidebar;
