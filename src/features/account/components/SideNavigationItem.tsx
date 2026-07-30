"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils/utils";

type SideNavigationItemProps = {
	name: string;
	href: string;
	icon: JSX.Element;
};

const navItemClasses = {
	item: "flex w-full items-center justify-center gap-2 px-2 py-3 font-semibold text-primary-200 hover:bg-primary-900 hover:text-primary-100 sm:justify-start sm:gap-3 sm:px-3 md:gap-4 md:px-4",
	icon: "h-5 w-5 shrink-0 text-primary-600",
	text: "hidden sm:inline",
};

export const SideNavigationItem = ({
	name,
	href,
	icon,
}: SideNavigationItemProps) => {
	const pathname = usePathname();
	const isActive = href === pathname;

	return (
		<li>
			<Link
				className={cn(
					navItemClasses.item,
					isActive &&
						"pointer-events-none cursor-not-allowed bg-primary-900",
				)}
				href={href}
				aria-disabled={isActive}
				tabIndex={isActive ? -1 : undefined}
				onClick={(e) => {
					if (isActive) e.preventDefault();
				}}
			>
				{icon}
				<span className={navItemClasses.text}>{name}</span>
			</Link>
		</li>
	);
};
