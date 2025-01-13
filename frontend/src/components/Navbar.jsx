import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User, Plus, Home, Compass, Mail } from "lucide-react";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
	const token = localStorage.getItem("token");
	const location = useLocation();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);

	const currentUser = useAuth();

	const navigate = useNavigate();
	const mobileMenuRef = useRef(null);
	const profileMenuRef = useRef(null);
	const mobileButtonRef = useRef(null);
	const profileButtonRef = useRef(null);

	useEffect(() => {
		setIsMobileMenuOpen(false);
		setShowProfileMenu(false);
	}, [location.pathname]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				isMobileMenuOpen &&
				mobileMenuRef.current &&
				!mobileMenuRef.current.contains(event.target) &&
				!mobileButtonRef.current.contains(event.target)
			) {
				setIsMobileMenuOpen(false);
			}

			if (
				showProfileMenu &&
				profileMenuRef.current &&
				!profileMenuRef.current.contains(event.target) &&
				!profileButtonRef.current.contains(event.target)
			) {
				setShowProfileMenu(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isMobileMenuOpen, showProfileMenu]);

	const handleSignOut = () => {
		localStorage.clear();
		navigate("/sign-in");
	};

	return (
		<nav className="fixed w-full top-0 z-50 bg-black backdrop-blur-sm border-b border-gray-800">
			<div className="max-w-7xl mx-auto px-4 lg:px-8">
				<div className="flex justify-between h-16">
					{/* Logo */}
					<div className="flex items-center">
						<Link to="/" className="flex items-center">
							<span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
								EventCraft
							</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-6">
						<Link
							to="/"
							className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 py-2"
						>
							<Home size={18} />
							<span>Home</span>
						</Link>
						<Link
							to="/all-events"
							className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 py-2"
						>
							<Compass size={18} />
							<span>Events Dashboard</span>
						</Link>
						{token ? (
							<>
								<Link
									to="/add-event"
									className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 py-2"
								>
									<Plus size={18} />
									<span>Add Event</span>
								</Link>
								{/* Profile Menu Toggle */}
								<div className="relative">
									<button
										ref={profileButtonRef}
										onClick={() => setShowProfileMenu(!showProfileMenu)}
										className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 py-2"
									>
										<User size={18} />
										<span>Profile</span>
									</button>

									{/* Profile Dropdown */}
									{showProfileMenu && (
										<div
											ref={profileMenuRef}
											className="absolute right-0 mt-2 w-48 bg-black border border-gray-800 rounded-lg shadow-lg py-1"
										>
											<p
												className="block px-4 py-2 text-gray-300 hover:bg-gray-900 hover:text-white"
												onClick={() => setShowProfileMenu(false)}
											>
												{currentUser.name || "Guest"}
											</p>
											<p
												className="block px-4 py-2 text-gray-300 hover:bg-gray-900 hover:text-white"
												onClick={() => setShowProfileMenu(false)}
											>
												{currentUser.email || "guest@gmail.com"}
											</p>
											<button
												onClick={handleSignOut}
												className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-900 hover:text-red-300 flex items-center"
											>
												<LogOut size={16} className="mr-2" />
												Sign Out
											</button>
										</div>
									)}
								</div>
							</>
						) : (
							<div className="flex items-center space-x-4">
								<Link
									to="/sign-in"
									className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
								>
									Sign In
								</Link>
								<Link
									to="/sign-up"
									className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
								>
									Sign Up
								</Link>
							</div>
						)}
					</div>

					{/* Mobile Menu Button */}
					<button
						ref={mobileButtonRef}
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="md:hidden p-2 text-gray-300 hover:text-white"
					>
						{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div
					ref={mobileMenuRef}
					className="md:hidden bg-black border-t border-gray-800"
				>
					<div className="px-2 pt-2 pb-3 space-y-1">
						<Link
							to="/"
							className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-900 hover:text-white"
						>
							<Home size={18} />
							<span>Home</span>
						</Link>
						<Link
							to="/all-events"
							className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-900 hover:text-white"
						>
							<Compass size={18} />
							<span>Events Dashboard</span>
						</Link>
						{token ? (
							<>
								<Link
									to="/add-event"
									className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-900 hover:text-white"
								>
									<Plus size={18} />
									<span>Add Event</span>
								</Link>
								<p className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-900 hover:text-white">
									<User size={18} />
									<span>{currentUser.name || "Guest"}</span>
								</p>
								<p className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-900 hover:text-white">
									<Mail size={18} />
									<span>{currentUser.email || "guest@gmail.com"}</span>
								</p>
								<button
									onClick={handleSignOut}
									className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-red-400 hover:bg-gray-900 hover:text-red-300"
								>
									<LogOut size={18} />
									<span>Sign Out</span>
								</button>
							</>
						) : (
							<div className="grid gap-2 px-3 py-2">
								<Link
									to="/sign-in"
									className="block px-3 py-2 rounded-md text-center text-gray-300 hover:bg-gray-900 hover:text-white"
								>
									Sign In
								</Link>
								<Link
									to="/sign-up"
									className="block px-3 py-2 rounded-md text-center bg-purple-600 text-white hover:bg-purple-700"
								>
									Sign Up
								</Link>
							</div>
						)}
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
