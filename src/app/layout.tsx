import { Logo } from "@/src/components/Logo";
import { Navigation } from "@/src/components/Navigation";

export const metadata = {
	title: "The Wild Oasis",
	description: "Website for The Wild Oasis",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<header>
					<Logo />
				</header>
				<Navigation />
				<main>{children}</main>
				<footer>Temporary footer - The Wild Oasis</footer>
			</body>
		</html>
	);
}
