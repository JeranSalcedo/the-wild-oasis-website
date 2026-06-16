import Image from "next/image";
import Link from "next/link";

import { UsersIcon } from "@heroicons/react/24/solid";

import type { Cabin } from "../types/cabin.types";

type CabinCardProps = {
	cabin: Cabin;
};

export const CabinCard = ({ cabin }: CabinCardProps) => {
	const { id, name, imageUrl, maxCapacity, basePrice, discount } = cabin;

	return (
		<div className="flex border border-primary-800">
			<div className="relative flex-1">
				<Image
					src={imageUrl}
					fill
					alt={`Cabin ${name}`}
					className="border-r border-primary-800 object-cover"
					sizes="(max-width: 768px) 50vw, 25vw"
				/>
			</div>

			<div className="flex-grow">
				<div className="bg-primary-950 px-7 pb-4 pt-5">
					<h3 className="mb-3 text-2xl font-semibold text-accent-500">
						Cabin {name}
					</h3>

					<div className="mb-2 flex items-center gap-3">
						<UsersIcon className="h-5 w-5 text-primary-600" />
						<p className="text-lg text-primary-200">
							Can accommodate up to{" "}
							<span className="font-bold">{maxCapacity}</span>{" "}
							guests
						</p>
					</div>

					<p className="flex items-baseline justify-end gap-3">
						{discount > 0 ? (
							<>
								<span className="text-3xl font-[350]">
									${basePrice - discount}
								</span>
								<span className="font-semibold text-primary-600 line-through">
									${basePrice}
								</span>
							</>
						) : (
							<span className="text-3xl font-[350]">
								${basePrice}
							</span>
						)}
						<span className="text-primary-200">/ night</span>
					</p>
				</div>

				<div className="border-t border-t-primary-800 bg-primary-950 text-right">
					<Link
						href={`/cabins/${id}`}
						className="inline-block border-l border-primary-800 px-6 py-4 transition-colors duration-300 hover:bg-accent-600 hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
					>
						Details & reservation &rarr;
					</Link>
				</div>
			</div>
		</div>
	);
};
