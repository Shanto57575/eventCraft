import { Sparkles, Crown, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Banner = () => {
	return (
		<div className="relative min-h-screen bg-black overflow-hidden">
			<div className="absolute inset-0">
				<div className="absolute top-10 left-4 w-32 sm:w-72 h-32 sm:h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-10 right-4 w-40 sm:w-96 h-40 sm:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700" />
			</div>

			<div className="absolute hidden sm:block -inset-x-full top-1/2 -translate-y-1/2 transform rotate-12 h-32 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

			<div className="relative flex flex-col items-center justify-center min-h-screen px-2 sm:px-4 py-10 sm:py-20">
				<div className="absolute hidden sm:block top-1/4 left-1/4 animate-bounce">
					<Crown className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500/50" />
				</div>
				<div className="absolute hidden sm:block bottom-1/3 right-1/3 animate-bounce delay-300">
					<Zap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500/50" />
				</div>

				<div className="relative text-center">
					<h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-3 sm:mb-6 tracking-tighter">
						CRAFT
						<span className="relative inline-block mx-1 sm:mx-2">
							<span className="relative z-10 bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 text-transparent bg-clip-text">
								2025
							</span>
							<div className="absolute inset-0 bg-white/10 blur-2xl" />
						</span>
					</h1>
				</div>

				<div className="relative max-w-[260px] sm:max-w-none">
					<div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-20 animate-pulse" />
					<p className="relative bg-black border border-white/10 rounded-lg px-3 sm:px-8 py-2 sm:py-4 text-sm sm:text-base md:text-xl text-gray-400 font-light text-center">
						Beyond Events, We Create Stories
					</p>
				</div>

				<Link to="/all-events">
					<button className="group relative mt-6 sm:mt-12 px-6 sm:px-12 py-3 sm:py-6 bg-transparent overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 transform group-hover:translate-x-full transition-transform duration-500" />
						<div className="relative flex items-center gap-2 sm:gap-3 text-base sm:text-xl font-bold text-white">
							<Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
							Begin Your Journey
						</div>
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Banner;
