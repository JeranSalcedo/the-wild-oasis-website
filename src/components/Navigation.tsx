import Image from "next/image";
import { auth } from "@/auth";

import { NavigationButton } from "./NavigationButton";

const navLinks = [
	{
		name: "Cabins",
		href: "/cabins",
	},
	{
		name: "About",
		href: "/about",
	},
	{
		name: "Guest area",
		href: "/account",
	},
];

export const Navigation = async () => {
	const session = await auth();

	return (
		<nav className="z-10 text-base sm:text-lg md:text-xl">
			<ul className="flex items-center gap-6 sm:gap-8 md:gap-10">
				{navLinks.map((link) => (
					<li key={link.name}>
						<NavigationButton href={link.href}>
							{link.href === "/account" &&
							session?.user?.image ? (
								<div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
									<Image
										className="h-6 w-6 rounded-full sm:h-7 sm:w-7 md:h-8 md:w-8"
										src={session.user.image ?? ""}
										alt={session.user.name ?? ""}
										width={32}
										height={32}
										referrerPolicy="no-referrer"
									/>
									<span>{link.name}</span>
								</div>
							) : (
								<span>{link.name}</span>
							)}
						</NavigationButton>
					</li>
				))}
			</ul>
		</nav>
	);
};
