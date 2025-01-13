import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { useEffect, useState } from "react";
import GuestLogin from "../components/GuestLogin";

const SignIn = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			navigate("/");
		}
	}, [navigate]);

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			const apiResponse = await axiosInstance.post(
				"/api/auth/login-user",
				data
			);
			if (apiResponse.status === 200) {
				localStorage.setItem("token", apiResponse.data.token);
				toast.success(apiResponse.data.message);
				reset();
				setTimeout(() => {
					navigate("/");
				}, 1000);
			}
		} catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<div className="w-full max-w-xs">
				<h1 className="text-center mb-2 text-2xl font-bold">
					<span className="text-sm">Sign In to</span>
					<p>EventCraft</p>
				</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="shadow-md shadow-white rounded px-8 pt-6 pb-8 mb-4 my-auto"
				>
					<div className="mb-4">
						<label className="block text-sm font-bold mb-2" htmlFor="username">
							*Email
						</label>
						<input
							{...register("email", { required: true })}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="text"
							placeholder="email"
						/>
						{errors.email && (
							<span className="text-red-600 my-1.5">email is required</span>
						)}
					</div>
					<div className="mb-6">
						<label className="block text-sm font-bold mb-2" htmlFor="password">
							*Password
						</label>
						<input
							{...register("password", { required: true })}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							placeholder="******************"
						/>
						{errors.password && (
							<span className="text-red-600 my-1.5">password is required</span>
						)}
					</div>
					<section className="text-center">
						<button
							disabled={loading}
							type="submit"
							className="border cursor-pointer hover:bg-slate-700 duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							{loading ? "Signing In...." : "Sign In"}
						</button>
						<p className="text-sm mt-2">
							Dont have an account ?
							<Link
								className="text-white hover:text-blue-500 ml-2 underline"
								to="/sign-up"
							>
								Sign Up
							</Link>
						</p>
					</section>
					<Toaster />
				</form>
				<button className="w-full max-w-xs my-2">
					<GuestLogin />
				</button>
				<p className="text-center text-xs">
					©{new Date().getFullYear()} sh@nto Corp. All rights reserved.
				</p>
			</div>
		</div>
	);
};

export default SignIn;
