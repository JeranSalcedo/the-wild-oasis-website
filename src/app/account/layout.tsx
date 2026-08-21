import { SideNavigation } from "@/features/account";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="ml-5 grid h-full min-h-0 grid-cols-[4.5rem_minmax(0,1fr)] gap-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
			<SideNavigation />
			<div className="min-h-0 overflow-y-auto sm:py-0.5 md:py-1">
				{children}
			</div>
		</div>
	);
}
