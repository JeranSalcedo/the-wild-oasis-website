import Image from "next/image";

import { UsersIcon } from "@heroicons/react/24/solid";

import type { Cabin } from "../types/cabin.types";

import { Heading } from "@/components/Heading";
import { LinkButton } from "@/components/LinkButton";

type CabinCardProps = {
	cabin: Cabin;
};

export const CabinCard = ({ cabin }: CabinCardProps) => {
	const { id, name, imageUrl, maxCapacity, basePrice, discount } = cabin;

	return (
		<div className="flex flex-col border border-primary-800 transition-all duration-300 sm:flex-row md:flex-col lg:flex-row">
			<div className="relative h-64 transition-all duration-300 sm:h-auto sm:basis-2/5 md:h-72 md:basis-auto lg:h-auto lg:basis-2/5">
				<Image
					src={imageUrl}
					fill
					alt={`Cabin ${name}`}
					className="object-cover md:border-r md:border-primary-800"
					sizes="(max-width: 639px) 100vw, (max-width: 767px) 40vw, (max-width: 1023px) 100vw, 40vw"
				/>
			</div>

			<div className="flex-grow">
				<div className="bg-primary-950 px-7 pb-1 pt-5 transition-all duration-300 sm:pb-2 md:pb-1 lg:pb-2">
					<Heading className="md:text-base lg:text-lg" level={3}>
						Cabin {name}
					</Heading>

					<div className="mb-2 flex items-center gap-2 transition-all duration-300 sm:gap-3 md:gap-2 lg:gap-3">
						<UsersIcon className="h-4 w-4 text-primary-600 transition-all duration-300 sm:h-5 sm:w-5 md:h-4 md:w-4 lg:h-5 lg:w-5" />
						<p className="text-primary-200 transition-all duration-300 md:text-sm lg:text-lg">
							Can accommodate up to{" "}
							<span className="font-bold">{maxCapacity}</span>{" "}
							guests
						</p>
					</div>

					<p className="flex items-baseline justify-end gap-1 sm:gap-2 md:gap-1 lg:gap-2">
						{discount > 0 ? (
							<>
								<span className="text-xl font-[350] transition-all duration-300 sm:text-2xl md:text-xl lg:text-2xl">
									${basePrice - discount}
								</span>
								<span className="font-semibold text-primary-600 line-through md:text-sm lg:text-base">
									${basePrice}
								</span>
							</>
						) : (
							<span className="text-xl font-[350] transition-all duration-300 sm:text-2xl md:text-xl lg:text-2xl">
								${basePrice}
							</span>
						)}
						<span className="text-primary-200 md:text-sm lg:text-base">
							/ night
						</span>
					</p>
				</div>

				<div className="border-t border-t-primary-800 bg-primary-950 text-right">
					<LinkButton
						className="bg-accent-0 inline-block border-l border-primary-800 px-5 py-3 hover:text-primary-900 focus:ring-primary-600 sm:px-6 sm:py-4 md:px-5 md:py-3 md:text-sm lg:px-6 lg:py-4 lg:text-base"
						href={`/cabins/${id}`}
					>
						Details & reservation &rarr;
					</LinkButton>
				</div>
			</div>
		</div>
	);
};
