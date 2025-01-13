import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { useEffect, useState } from "react";
import GuestLogin from "../components/GuestLogin";

const SignUp = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

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
				"/api/auth/create-user",
				data
			);
			if (apiResponse.status === 201) {
				toast.success(apiResponse.data.message);
				reset();
				setTimeout(() => {
					navigate("/sign-in");
				}, 1000);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="w-full max-w-xs">
				<h1 className="text-center mb-2 text-2xl font-bold">
					<span className="text-sm">Sign Up to</span>
					<p>EventCraft</p>
				</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="shadow-md shadow-white rounded px-8 pt-6 pb-8 mb-4 my-auto"
				>
					<div className="mb-4">
						<label
							className="block text-gray-50 text-sm font-bold mb-2"
							htmlFor="name"
						>
							*Name
						</label>
						<input
							{...register("name", {
								required: "name is required",
								maxLength: {
									value: 20,
									message: "name should not exceed 20 characters",
								},
							})}
							className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							type="text"
							placeholder="name"
						/>
						{errors.name && (
							<span className="text-rose-600 my-1.5">
								{errors.name.message}
							</span>
						)}
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-50 text-sm font-bold mb-2"
							htmlFor="email"
						>
							*Email
						</label>
						<input
							{...register("email", {
								pattern: {
									value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
									message: "Invalid email address",
								},
								required: "Email is required",
							})}
							className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="email"
							placeholder="Email"
						/>
						{errors.email && (
							<span className="text-rose-600 my-1.5">
								{errors.email.message}
							</span>
						)}
					</div>
					<div className="mb-6">
						<label
							className="block text-gray-50 text-sm font-bold mb-2"
							htmlFor="password"
						>
							*Password
						</label>
						<input
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 6,
									message: "Password should be at least 6 characters long",
								},
								maxLength: {
									value: 15,
									message: "Password should not exceed 15 characters",
								},
								pattern: {
									value:
										/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?!.*\s).{6,15}$/,
									message:
										"Password should contain:\n at least one uppercase letter\n, one lowercase letter\n, one number\n, one special character\n, and no spaces",
								},
							})}
							className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							placeholder="password"
						/>
						{errors.password && (
							<span className="text-rose-600 my-1.5">
								{errors.password.message}
							</span>
						)}
					</div>
					<section className="text-center">
						<button
							disabled={loading}
							type="submit"
							className="w-full border cursor-pointer hover:bg-white hover:text-black duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							{loading ? "Signing Up...." : "Sign Up"}
						</button>
						<p className="text-sm text-white mt-2">
							Already have an account ?
							<Link
								className="hover:text-blue-500 ml-2 underline"
								to="/sign-in"
							>
								Sign In
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

export default SignUp;
