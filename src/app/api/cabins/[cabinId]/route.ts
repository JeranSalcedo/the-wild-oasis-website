import { getBookedDatesByCabinId } from "@/features/bookings";
import { getCabin } from "@/features/cabins";

type RouteContext = {
	params: { cabinId: string };
};

export async function GET(_request: Request, { params }: RouteContext) {
	const cabinId = Number(params.cabinId);

	try {
		const [cabin, bookings] = await Promise.all([
			getCabin(cabinId),
			getBookedDatesByCabinId(cabinId),
		]);

		if (!cabin) {
			return Response.json(
				{ message: "Cabin not found" },
				{ status: 404 },
			);
		}

		return Response.json({
			cabin,
			bookings,
		});
	} catch (error) {
		console.error(error);

		return Response.json(
			{ message: "Internal server error" },
			{ status: 500 },
		);
	}
}
