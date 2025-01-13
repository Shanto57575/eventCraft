const Footer = () => {
	return (
		<footer className="bg-black text-white">
			<div className="container mx-auto px-4 py-8 sm:py-12">
				{/* Top Section */}
				<div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
					{/* Logo and Description */}
					<div className="mb-6 sm:mb-0 sm:w-1/3">
						<h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
							EventCraft
						</h2>
						<p className="text-sm text-gray-400">
							<p>Where every event becomes unforgettable.</p>
							<p> Explore, create, and join events with ease.</p>
						</p>
					</div>

					{/* Navigation Links */}
					<div className="flex flex-col sm:flex-row sm:justify-between sm:w-2/3 gap-6">
						<div>
							<h3 className="text-lg font-semibold mb-2">Quick Links</h3>
							<ul className="text-sm text-gray-400 space-y-2">
								<li>
									<a href="#" className="hover:text-gray-200">
										About Us
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-gray-200">
										Explore Events
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-gray-200">
										Contact
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-2">Support</h3>
							<ul className="text-sm text-gray-400 space-y-2">
								<li>
									<a href="#" className="hover:text-gray-200">
										FAQ
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-gray-200">
										Terms of Service
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-gray-200">
										Privacy Policy
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-2">Follow Us</h3>
							<ul className="flex space-x-4 text-gray-400">
								<li>
									<a
										href="#"
										rel="noopener noreferrer"
										className="hover:text-gray-200"
									>
										Facebook
									</a>
								</li>
								<li>
									<a
										href="#"
										rel="noopener noreferrer"
										className="hover:text-gray-200"
									>
										Twitter
									</a>
								</li>
								<li>
									<a
										href="#"
										rel="noopener noreferrer"
										className="hover:text-gray-200"
									>
										Instagram
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-gray-700 mt-8"></div>

				{/* Bottom Section */}
				<div className="flex flex-col sm:flex-row justify-between items-center mt-6">
					<p className="text-sm text-gray-500">
						© {new Date().getFullYear()} EventCraft. All Rights Reserved.
					</p>
					<ul className="flex space-x-4 text-sm text-gray-500 mt-4 sm:mt-0">
						<li>
							<a href="#" className="hover:text-gray-200">
								Terms
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-gray-200">
								Privacy
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
