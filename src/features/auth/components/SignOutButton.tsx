import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

import { signOutAction } from "../actions/sign-out";

const navItemClasses = {
	item: "flex w-full items-center justify-center gap-2 px-2 py-3 font-semibold text-primary-200 hover:bg-primary-900 hover:text-primary-100 sm:justify-start sm:gap-3 sm:px-3 md:gap-4 md:px-4",
	icon: "h-5 w-5 shrink-0 text-primary-600",
	text: "hidden sm:inline",
};

export const SignOutButton = () => {
	const { item, icon, text } = navItemClasses;

	return (
		<form action={signOutAction}>
			<button className={item}>
				<ArrowRightStartOnRectangleIcon className={icon} />
				<span className={text}>Sign out</span>
			</button>
		</form>
	);
};
