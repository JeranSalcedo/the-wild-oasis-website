"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	CalendarDaysIcon,
	HomeIcon,
	UserIcon,
} from "@heroicons/react/24/solid";

import { cn } from "@/utils/utils";

import { SignoutButton } from "./SignoutButton";

const navItemClasses = {
	item: "flex w-full items-center justify-center gap-2 px-2 py-3 font-semibold text-primary-200 hover:bg-primary-900 hover:text-primary-100 sm:justify-start sm:gap-3 sm:px-3 md:gap-4 md:px-4",
	icon: "h-5 w-5 shrink-0 text-primary-600",
	text: "hidden sm:inline",
};

const navLinks = [
	{
		name: "Home",
		href: "/account",
		icon: <HomeIcon className={navItemClasses.icon} />,
	},
	{
		name: "Reservations",
		href: "/account/reservations",
		icon: <CalendarDaysIcon className={navItemClasses.icon} />,
	},
	{
		name: "Guest profile",
		href: "/account/profile",
		icon: <UserIcon className={navItemClasses.icon} />,
	},
];

export const SideNavigation = () => {
	const pathname = usePathname();

	return (
		<nav className="border-r border-primary-900">
			<ul className="mr-1 flex h-full flex-col gap-2 sm:gap-3 md:gap-4">
				{navLinks.map((link) => (
					<li key={link.name}>
						<Link
							className={cn(
								navItemClasses.item,
								link.href === pathname
									? "pointer-events-none cursor-not-allowed bg-primary-900"
									: "",
							)}
							href={link.href}
							aria-disabled={link.href === pathname}
							tabIndex={link.href === pathname ? -1 : undefined}
							onClick={(e) => {
								if (link.href === pathname) e.preventDefault();
							}}
						>
							{link.icon}
							<span className={navItemClasses.text}>
								{link.name}
							</span>
						</Link>
					</li>
				))}

				<li className="mt-auto">
					<SignoutButton className={navItemClasses} />
				</li>
			</ul>
		</nav>
	);
};
