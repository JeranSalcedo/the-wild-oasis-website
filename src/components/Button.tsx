"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
};

export const Button = ({ children, className, ...props }: ButtonProps) => {
	return (
		<button
			className={cn(
				"px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5",
				"rounded-lg bg-accent-500 font-semibold text-primary-800",
				"hover:bg-accent-600",
				"focus:outline-none focus:outline-1 focus:outline-offset-1 focus:outline-accent-300 sm:focus:outline-2 sm:focus:outline-offset-2 md:focus:outline-4 md:focus:outline-offset-4",
				"disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
};
