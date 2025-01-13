import toast from "react-hot-toast";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";

const GuestLogin = () => {
	const navigate = useNavigate();

	const handleGuestLogin = async () => {
		try {
			const response = await axiosInstance.post("/api/auth/guest-login");
			const { token, user } = response.data;

			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));

			toast.success("Logged in as Guest");
			navigate("/");
		} catch (error) {
			toast.error(error.response?.data?.message || "Guest login failed");
		}
	};

	return (
		<div
			onClick={handleGuestLogin}
			className="w-full border px-4 py-1.5 rounded-lg cursor-pointer hover:bg-white hover:text-black duration-300"
		>
			Login as Guest
		</div>
	);
};

export default GuestLogin;
