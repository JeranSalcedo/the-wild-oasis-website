import { TrashIcon } from "@heroicons/react/24/solid";

type DeleteBookingProps = {
	id: number;
};

export const DeleteBooking = ({ id }: DeleteBookingProps) => {
	console.log(id);

	return (
		<button className="group flex flex-grow items-center justify-center gap-2 border-primary-800 py-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900 md:items-start">
			<TrashIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
			<span className="mt-1">Delete</span>
		</button>
	);
};
