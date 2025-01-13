import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

const useAuth = () => {
	const token = localStorage.getItem("token");
	const [user, setUser] = useState({});
	const currentUser = localStorage.getItem("user");
	const fetchUser = async () => {
		try {
			const apiResponse = await axiosInstance.get("/api/auth/get-user", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setUser(apiResponse.data || localStorage.getItem("user"));
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (!currentUser) {
			fetchUser();
		}
	}, []);

	return user;
};

export default useAuth;
