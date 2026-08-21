import Link from "next/link";

export const EmptyReservations = () => {
	return (
		<p>
			You have no reservations yet. Check out our{" "}
			<Link className="text-accent-500 underline" href="/cabins">
				luxury cabins &rarr;
			</Link>
		</p>
	);
};
