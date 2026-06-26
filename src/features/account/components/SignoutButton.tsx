import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

type SignoutButtonProps = {
	className?: {
		item: string;
		icon: string;
		text: string;
	};
};

export const SignoutButton = ({
	className = { item: "", icon: "", text: "" },
}: SignoutButtonProps) => {
	const { item, icon, text } = className;

	return (
		<button className={item}>
			<ArrowRightStartOnRectangleIcon className={icon} />
			<span className={text}>Sign out</span>
		</button>
	);
};
