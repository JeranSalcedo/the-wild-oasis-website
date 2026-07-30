import { SelectCountry, UpdateProfile } from "@/features/account";

export const metadata = {
	title: "Profile",
	description: "Update your profile.",
};

export default function Page() {
	return (
		<div className="py-8">
			<h2 className="mb-4 text-base font-semibold text-accent-400 sm:text-xl md:text-2xl">
				Update your guest profile
			</h2>

			<p className="mb-8 text-primary-200">
				Providing the following information will make your check-in
				process faster and smoother. See you soon!
			</p>

			<UpdateProfile>
				<SelectCountry
					id="nationality"
					name="nationality"
					className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
				/>
			</UpdateProfile>
		</div>
	);
}
