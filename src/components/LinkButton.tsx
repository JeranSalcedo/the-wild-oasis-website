"use client";

import Link from "next/link";

import { ReactNode } from "react";

import { cn } from "@/utils/utils";

const variants = {
	link: "hover:text-accent-400 outline-none",
	logo: "outline-none",
	regular:
		"bg-accent-500 px-7 py-5 font-semibold text-primary-800 transition-all duration-300 hover:bg-accent-600 md:px-8 md:py-6 rounded-lg focus:outline-none focus:outline focus:outline-4 focus:outline-offset-4 focus:outline-accent-300",
};

type LinkButtonProps = {
	className?: string;
	href?: string;
	type?: keyof typeof variants;
	disabled?: boolean;
	children: ReactNode;
};

export const LinkButton = ({
	className,
	href = "",
	type = "link",
	disabled = false,
	children,
}: LinkButtonProps) => {
	return (
		<Link
			href={href}
			className={cn(
				variants[type],
				disabled ? "pointer-events-none cursor-not-allowed" : "",
				className,
			)}
			aria-disabled={disabled}
			tabIndex={disabled ? -1 : undefined}
			onClick={(e) => {
				if (disabled) e.preventDefault();
			}}
		>
			{children}
		</Link>
	);
};
