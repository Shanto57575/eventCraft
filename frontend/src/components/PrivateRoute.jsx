import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const token = localStorage.getItem("token");

	useEffect(() => {
		if (!token) {
			navigate("/sign-in", { state: { from: location } });
		}
	}, [token, navigate, location]);

	return token ? children : null;
};

export default PrivateRoute;
