import { Spinner } from "@/components/Spinner";

export default function Loading() {
	return (
		<div className="grid items-center justify-center py-8 pr-5">
			<Spinner />
			<p className="text-xl text-primary-200">
				Loading reservation data...
			</p>
		</div>
	);
}
