import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
	return (
		<div>
			<Navbar />
			<div className="container mx-auto min-h-screen mt-20">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default App;
