import { SideNavigation } from "@/features/account";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-5 grid h-full grid-cols-[4.5rem_1fr] gap-6 sm:grid-cols-[11rem_1fr] sm:gap-8 md:grid-cols-[13rem_1fr] md:gap-10">
			<SideNavigation />
			<div className="sm:py-0.5 md:py-1">{children}</div>
		</div>
	);
}
