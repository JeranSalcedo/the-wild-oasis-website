import Image from "next/image";
import { Metadata } from "next";

import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

import { getCabin } from "@/features/cabins";

import { Heading } from "@/components/Heading";

type PageProps = {
	params: {
		cabinId: string;
	};
};

export const generateMetadata = async ({
	params,
}: PageProps): Promise<Metadata> => {
	const cabinId = Number(params.cabinId);
	const cabin = await getCabin(cabinId);

	if (!cabin)
		return {
			title: "Cabin Not Found",
		};

	return {
		title: `Cabin ${cabin.name}`,
		description: cabin.description,
	};
};

export default async function Page({ params }: PageProps) {
	const cabinId = Number(params.cabinId);
	const cabin = await getCabin(cabinId);

	if (!cabin) return null;

	const { name, description, imageUrl, maxCapacity } = cabin;

	return (
		<div className="mx-10 max-w-6xl">
			<div className="mb-8 grid gap-4 overflow-hidden border border-primary-800 px-10 py-3 sm:mb-12 sm:gap-6 md:mb-16 md:grid-cols-[2fr_3fr] md:gap-8">
				<div className="mt-5 flex items-center justify-center md:mt-0">
					<div className="relative aspect-square w-full max-w-sm md:aspect-[4/5] md:max-w-none">
						<Image
							src={imageUrl}
							alt={`Cabin ${name}`}
							className="object-cover"
							fill
							sizes="(max-width: 768px) 100vw, 43vw"
							priority
						/>
					</div>
				</div>

				<div>
					<Heading className="sm:-6 my-4 p-4 text-center text-4xl font-black text-accent-100 sm:my-6 sm:text-5xl md:my-8 md:p-8 md:text-6xl">
						Cabin {name}
					</Heading>

					<p className="md:sm-8 mb-4 text-primary-300 sm:mb-6">
						{description}
					</p>

					<ul className="mb-4 flex flex-col gap-3 md:mb-7 md:gap-4">
						<li className="flex items-center gap-8 sm:gap-12 md:gap-16">
							<UsersIcon className="h-4 w-4 text-primary-600 md:h-5 md:w-5" />
							<span className="transition-all duration-300">
								For up to{" "}
								<span className="font-bold">{maxCapacity}</span>{" "}
								guests
							</span>
						</li>
						<li className="flex items-center gap-1 sm:gap-2 md:gap-3">
							<MapPinIcon className="h-4 w-4 text-primary-600 md:h-5 md:w-5" />
							<span className="transition-all duration-300">
								Located in the heart of the{" "}
								<span className="font-bold">Dolomites</span>{" "}
								(Italy)
							</span>
						</li>
						<li className="flex items-center gap-1 sm:gap-2 md:gap-3">
							<EyeSlashIcon className="h-4 w-4 text-primary-600 md:h-5 md:w-5" />
							<span className="transition-all duration-300">
								Privacy <span className="font-bold">100%</span>{" "}
								guaranteed
							</span>
						</li>
					</ul>
				</div>
			</div>

			<Heading
				className="mb-5 text-center text-3xl font-semibold sm:text-4xl md:text-5xl"
				level={2}
			>
				Reserve {name} today. Pay on arrival.
			</Heading>
		</div>
	);
}
