import { Josefin_Sans } from "next/font/google";

// Component imports (named exports)
import { Logo } from "@/components/Logo";
import { Navigation } from "@/components/Navigation";

// Global styles (side-effect import)
import "./globals.css";

const josefin = Josefin_Sans({
	subsets: ["latin"],
	display: "swap",
});

export const metadata = {
	title: {
		template: "%s | The Wild Oasis",
		default: "The Wild Oasis",
	},
	description: "Website for The Wild Oasis",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={josefin.className}>
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
