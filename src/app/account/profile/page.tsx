import { Suspense } from "react";

import { UpdateProfile } from "@/features/account";

import { Spinner } from "@/components/Spinner";

export const metadata = {
	title: "Profile",
	description: "Update your profile.",
};

export default async function Page() {
	return (
		<div className="py-8 pr-5">
			<h2 className="mb-4 text-base font-semibold text-accent-400 sm:text-xl md:text-2xl">
				Update your guest profile
			</h2>

			<p className="mb-8 text-primary-200">
				Providing the following information will make your check-in
				process faster and smoother. See you soon!
			</p>

			<Suspense fallback={<Spinner />}>
				<UpdateProfile />
			</Suspense>
		</div>
	);
}
