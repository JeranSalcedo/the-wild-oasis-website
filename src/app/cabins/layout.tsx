import { ReservationProvider } from "@/features/bookings";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <ReservationProvider>{children}</ReservationProvider>;
}
