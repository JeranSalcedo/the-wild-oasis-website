import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

export const Header = () => {
	return (
		<header className="border-b border-primary-900 px-5 py-3">
			<div className="mx-auto flex max-w-7xl items-center justify-between">
				<Logo />
				<Navigation />
			</div>
		</header>
	);
};
