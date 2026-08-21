import {
	CalendarDaysIcon,
	HomeIcon,
	UserIcon,
} from "@heroicons/react/24/solid";

import { SignOutButton } from "@/features/auth";
import { SideNavigationItem } from "./SideNavigationItem";

const navLinks = [
	{
		name: "Home",
		href: "/account",
		icon: <HomeIcon className="h-5 w-5 shrink-0 text-primary-600" />,
	},
	{
		name: "Reservations",
		href: "/account/reservations",
		icon: (
			<CalendarDaysIcon className="h-5 w-5 shrink-0 text-primary-600" />
		),
	},
	{
		name: "Guest profile",
		href: "/account/profile",
		icon: <UserIcon className="h-5 w-5 shrink-0 text-primary-600" />,
	},
];

export const SideNavigation = () => {
	return (
		<nav className="border-r border-primary-900 py-4">
			<ul className="mr-1 flex h-full flex-col gap-2 sm:gap-3 md:gap-4">
				{navLinks.map((link) => (
					<SideNavigationItem key={link.name} {...link} />
				))}

				<li className="mt-auto">
					<SignOutButton />
				</li>
			</ul>
		</nav>
	);
};
