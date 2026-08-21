"use client";

import { useTransition } from "react";

import { TrashIcon } from "@heroicons/react/24/solid";

type DeleteBookingProps = {
	id: number;
	onDelete: (bookingId: number) => Promise<void>;
	disabled?: boolean;
};

export const DeleteBooking = ({
	id,
	onDelete,
	disabled = false,
}: DeleteBookingProps) => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = () => {
		if (confirm("Are you sure you want to delete this reservation?"))
			startTransition(() => onDelete(id));
	};

	return (
		<button
			className="group flex flex-grow items-center justify-center gap-2 border-primary-800 py-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900 disabled:pointer-events-none disabled:cursor-not-allowed lg:w-full"
			onClick={handleDelete}
			disabled={disabled || isPending}
		>
			{isPending ? (
				<div className="spinner-mini h-5 w-5" />
			) : (
				<TrashIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
			)}
			<span className="mt-1">Delete</span>
		</button>
	);
};
