import Image from "next/image";

import { LinkButton } from "./LinkButton";

export const Logo = () => {
	return (
		<LinkButton
			href="/"
			className="z-10 flex items-center gap-4"
			type="logo"
		>
			<div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14">
				<Image
					src="/logo.png"
					alt="The Wild Oasis logo"
					fill
					className="object-contain"
					sizes="40px"
				/>
			</div>
			<span className="hidden text-sm font-semibold sm:inline sm:text-base md:text-lg">
				The Wild Oasis
			</span>
		</LinkButton>
	);
};
