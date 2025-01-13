import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import AllEvents from "./pages/AllEvents";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";
import EventParticipants from "./pages/EventParticipants";
import App from "./App";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/all-events",
				element: <AllEvents />,
			},
			{
				path: "/add-event",
				element: (
					<PrivateRoute>
						<AddEvent />
					</PrivateRoute>
				),
			},
			{
				path: "/event-participants",
				element: (
					<PrivateRoute>
						<EventParticipants />
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: "/sign-in",
		element: <SignIn />,
	},
	{
		path: "/sign-up",
		element: <SignUp />,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<div className="font-serif">
			<RouterProvider router={router} />
			<Toaster />
		</div>
	</StrictMode>
);
