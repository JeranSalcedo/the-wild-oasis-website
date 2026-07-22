"use client";

import { usePathname } from "next/navigation";

import { LinkButton } from "./LinkButton";

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

export const Navigation = () => {
	const pathname = usePathname();

	return (
		<nav className="z-10 text-base sm:text-lg md:text-xl">
			<ul className="flex items-center gap-6 sm:gap-8 md:gap-10">
				{navLinks.map((link) => (
					<li key={link.name}>
						<LinkButton
							className={
								link.href === pathname ? "text-accent-400" : ""
							}
							href={link.href}
							disabled={link.href == pathname}
						>
							{link.name}
						</LinkButton>
					</li>
				))}
			</ul>
		</nav>
	);
};
