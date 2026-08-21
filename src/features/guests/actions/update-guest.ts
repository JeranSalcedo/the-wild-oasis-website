"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { updateGuest as updateGuestApi } from "../api/guests.api";

export const updateGuest = async (data: FormData) => {
	const session = await auth();

	if (!session) throw new Error("You must be logged in");

	const nationalId = data.get("nationalId");
	const nationalityValue = data.get("nationality");

	if (typeof nationalId !== "string") {
		throw new Error("Invalid national id");
	}

	if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalId)) {
		throw new Error("National ID must be 6–12 letters or digits.");
	}

	if (typeof nationalityValue !== "string")
		throw new Error("Invalid nationality");

	const [nationality, countryFlag] = nationalityValue.split("%");

	const updateData = {
		national_id: nationalId,
		nationality,
		country_flag: countryFlag,
	};

	await updateGuestApi(Number(session.user.guestId), updateData);

	revalidatePath("/account/profile");
};
