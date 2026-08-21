"use client";

import Image from "next/image";

import { Button } from "@/components/Button";
import { useFormStatus } from "react-dom";

type FormElementsProps = {
	nationalId: string;
	countryFlag: string;
	children: React.ReactNode;
};

export const FormElements = ({
	nationalId,
	countryFlag,
	children,
}: FormElementsProps) => {
	const { pending } = useFormStatus();

	return (
		<>
			<div className="space-y-1">
				<div className="flex items-center justify-between">
					<label htmlFor="nationality">Where are you from?</label>
					{pending ? (
						<div className="spinner-mini" />
					) : (
						countryFlag && (
							<div className="relative h-5 w-5 md:h-7 md:w-7">
								<Image
									src={countryFlag}
									alt="Country flag"
									className="object-contain"
									fill
								/>
							</div>
						)
					)}
				</div>

				{children}
			</div>

			<div className="space-y-1">
				<label htmlFor="nationalId">National ID number</label>
				<input
					className={`w-full rounded-sm px-3 py-1 shadow-sm sm:px-4 sm:py-1.5 md:px-5 md:py-2 ${pending ? "cursor-not-allowed bg-gray-600 text-gray-400" : "bg-primary-200 text-primary-800"}`}
					name="nationalId"
					defaultValue={nationalId}
					readOnly={pending}
				/>
			</div>

			<div className="flex items-center justify-end gap-6">
				<Button disabled={pending}>
					{pending ? "Updating..." : "Update profile"}
				</Button>
			</div>
		</>
	);
};
