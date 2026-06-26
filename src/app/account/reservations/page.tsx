import { BookingCard, mapBookingWithCabinAndGuest } from "@/features/bookings";
import type { BookingWithCabinAndGuest } from "@/features/bookings";

import { Heading } from "@/components/Heading";

export const metadata = {
	title: "Reservations",
	description: "Mange your reservations.",
};

const testData = [
	{
		id: 104,
		created_at: "2026-05-27 09:40:05.825297+00",
		status: "checked-in",
		date_start: "2026-05-25 00:00:00",
		date_end: "2026-06-06 00:00:00",
		nights_count: 12,
		guests_count: 4,
		price_cabin: 5400,
		price_extras: 720,
		price_total: 6120,
		breakfast_included: true,
		paid: true,
		observations: "",
		cabin_id: 53,
		guest_id: 104,
		cabins: {
			id: 104,
			created_at: "2026-05-27 09:40:05.825297+00",
			name: "004",
			description:
				"Indulge in the ultimate luxury family vacation in this medium-sized cabin 004. Designed for families of up to 4, this cabin offers a sumptuous retreat for the discerning traveler. Inside, the cabin boasts of opulent interiors crafted from the finest quality wood, a comfortable living area, a fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-inspired en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
			image_url:
				"https://kfjzqfqgktyhvtedpeht.supabase.co/storage/v1/object/public/cabin-images/cabin-004.jpg",
			max_capacity: 4,
			base_price: 500,
			discount: 50,
		},
		guests: {
			id: 104,
			created_at: "2026-05-27 09:40:05.825297+00",
			full_name: "Khadija Ahmed",
			email: "khadija@gmail.com",
			national_id: "1023457890",
			nationality: "Sudan",
			country_flag: "https://flagcdn.com/sd.svg",
		},
	},
	{
		id: 105,
		created_at: "2026-05-27 09:40:05.825297+00",
		status: "checked-in",
		date_start: "2026-05-25 00:00:00",
		date_end: "2026-06-06 00:00:00",
		nights_count: 12,
		guests_count: 4,
		price_cabin: 5400,
		price_extras: 720,
		price_total: 6120,
		breakfast_included: true,
		paid: true,
		observations: "",
		cabin_id: 53,
		guest_id: 104,
		cabins: {
			id: 104,
			created_at: "2026-05-27 09:40:05.825297+00",
			name: "004",
			description:
				"Indulge in the ultimate luxury family vacation in this medium-sized cabin 004. Designed for families of up to 4, this cabin offers a sumptuous retreat for the discerning traveler. Inside, the cabin boasts of opulent interiors crafted from the finest quality wood, a comfortable living area, a fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-inspired en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
			image_url:
				"https://kfjzqfqgktyhvtedpeht.supabase.co/storage/v1/object/public/cabin-images/cabin-004.jpg",
			max_capacity: 4,
			base_price: 500,
			discount: 50,
		},
		guests: {
			id: 104,
			created_at: "2026-05-27 09:40:05.825297+00",
			full_name: "Khadija Ahmed",
			email: "khadija@gmail.com",
			national_id: "1023457890",
			nationality: "Sudan",
			country_flag: "https://flagcdn.com/sd.svg",
		},
	},
];

export default function Page() {
	const bookings: BookingWithCabinAndGuest[] = testData.map(
		mapBookingWithCabinAndGuest,
	);

	return (
		<div>
			<Heading level={2}>Your reservations</Heading>

			{bookings.length === 0 ? (
				<p>
					You have no reservations yet. Check out our{" "}
					<a className="text-accent-500 underline" href="/cabins">
						luxury cabins &rarr;
					</a>
				</p>
			) : (
				<ul className="space-y-6">
					{bookings.map((booking) => (
						<BookingCard key={booking.id} booking={booking} />
					))}
				</ul>
			)}
		</div>
	);
}
