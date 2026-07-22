import { Josefin_Sans } from "next/font/google";

import { cn } from "@/utils/utils";

// Global styles (side-effect import)
import "@daypicker/react/style.css";
import "./globals.css";

import { BreakpointProvider } from "@/contexts/BreakpointContext";

// Component imports (named exports)
import { Header } from "@/components/Header";

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
			<body
				className={cn(
					josefin.className,
					"flex min-h-dvh flex-col bg-primary-950 text-primary-100 antialiased",
					"text-sm sm:text-base md:text-lg",
				)}
			>
				<BreakpointProvider>
					<Header />
					<div className="grid flex-1 py-8">
						<main className="mx-auto w-full min-w-0 max-w-7xl">
							{children}
						</main>
					</div>
				</BreakpointProvider>
			</body>
		</html>
	);
}
