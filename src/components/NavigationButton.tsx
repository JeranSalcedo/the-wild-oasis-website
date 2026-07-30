"use client";

import { usePathname } from "next/navigation";

import { LinkButton } from "./LinkButton";

type NavigationButtonProps = {
	href: string;
	children: React.ReactNode;
};

export const NavigationButton = ({ href, children }: NavigationButtonProps) => {
	const pathname = usePathname();
	const active = pathname === href;

	return (
		<LinkButton
			className={active ? "text-accent-400" : ""}
			href={href}
			disabled={active}
		>
			{children}
		</LinkButton>
	);
};
