import { ReactNode } from "react";

import { cn } from "@/utils/utils";

type HeadingProps = {
	className?: string;
	level?: 1 | 2 | 3;
	children: ReactNode;
};

const headingStyles = {
	1: "mb-4 text-2xl font-medium text-accent-400 sm:mb-6 sm:text-3xl md:mb-8 md:text-4xl",
	2: "mb-2 text-xl font-semibold text-accent-400 sm:mb-3 sm:text-2xl md:mb-4 md:text-3xl",
	3: "mb-2 text-lg font-semibold text-accent-500 sm:mb-3 sm:text-xl md:mb-4 md:text-2xl",
};

export const Heading = ({ className, level = 1, children }: HeadingProps) => {
	const Tag = `h${level}` as const;

	return (
		<Tag className={cn(headingStyles[level], className)}>{children}</Tag>
	);
};
