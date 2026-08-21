import { updateGuest } from "@/features/guests/actions/update-guest";

import { getGuest } from "@/features/guests";

import { requireSession } from "@/features/auth";

import { FormElements } from "./FormElements";
import { SelectCountry } from "./SelectCountry";

export const UpdateProfile = async () => {
	const session = await requireSession();
	const guest = await getGuest(session.user.email!);

	if (!guest) throw new Error("Guest profile not found");

	const { name, email, nationalId, countryFlag } = guest;

	return (
		<form
			className="flex flex-col gap-4 bg-primary-900 px-8 py-4 sm:gap-5 sm:px-10 sm:py-6 md:gap-6 md:px-12 md:py-8"
			action={updateGuest}
		>
			<div className="space-y-1">
				<label>Full name</label>
				<input
					className="w-full rounded-sm bg-primary-200 px-3 py-1 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 sm:px-4 sm:py-1.5 md:px-5 md:py-2"
					name="name"
					defaultValue={name}
					disabled
				/>
			</div>

			<div className="space-y-1">
				<label>Email address</label>
				<input
					className="w-full rounded-sm bg-primary-200 px-3 py-1 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 sm:px-4 sm:py-1.5 md:px-5 md:py-2"
					name="email"
					defaultValue={email}
					disabled
				/>
			</div>

			<FormElements nationalId={nationalId} countryFlag={countryFlag}>
				<SelectCountry
					id="nationality"
					name="nationality"
					className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
					defaultCountry={`${guest.nationality}%${guest.countryFlag}`}
				/>
			</FormElements>
		</form>
	);
};
