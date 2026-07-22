"use client";

import { ReactNode, useState } from "react";

import { Button } from "@/components/Button";

type UpdateProfileProps = {
	children: ReactNode;
};

export const UpdateProfile = ({ children }: UpdateProfileProps) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	return (
		<form className="flex flex-col gap-4 bg-primary-900 px-8 py-4 sm:gap-5 sm:px-10 sm:py-6 md:gap-6 md:px-12 md:py-8">
			<div className="sm:space-y-1 md:space-y-2">
				<label>Full name</label>
				<input
					disabled
					className="w-full rounded-sm bg-primary-200 px-3 py-1 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 sm:px-4 sm:py-1.5 md:px-5 md:py-2"
				/>
			</div>

			<div className="sm:space-y-1 md:space-y-2">
				<label>Email address</label>
				<input
					disabled
					className="w-full rounded-sm bg-primary-200 px-3 py-1 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 sm:px-4 sm:py-1.5 md:px-5 md:py-2"
				/>
			</div>

			<div className="sm:space-y-1 md:space-y-2">
				<div className="flex items-center justify-between">
					<label htmlFor="nationality">Where are you from?</label>
					{/* <img
							src={countryFlag}
							alt="Country flag"
							className="h-5 rounded-sm"
						/> */}
				</div>

				{children}
			</div>

			<div className="sm:space-y-1 md:space-y-2">
				<label htmlFor="nationalID">National ID number</label>
				<input
					name="nationalID"
					className="w-full rounded-sm bg-primary-200 px-3 py-1 text-primary-800 shadow-sm sm:px-4 sm:py-1.5 md:px-5 md:py-2"
				/>
			</div>

			<div className="flex items-center justify-end gap-6">
				<Button>Update profile</Button>
			</div>
		</form>
	);
};
