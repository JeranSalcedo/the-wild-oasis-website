import { LinkButton } from "./LinkButton";

export const Navigation = () => {
	return (
		<nav className="z-10 text-base sm:text-lg md:text-xl">
			<ul className="flex items-center gap-6 sm:gap-8 md:gap-10">
				<li>
					<LinkButton href="/cabins">Cabins</LinkButton>
				</li>
				<li>
					<LinkButton href="/about">About</LinkButton>
				</li>
				<li>
					<LinkButton href="/account">Guest area</LinkButton>
				</li>
			</ul>
		</nav>
	);
};
