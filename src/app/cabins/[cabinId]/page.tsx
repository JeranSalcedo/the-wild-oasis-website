import Image from "next/image";
import { Metadata } from "next";

import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

import { getCabin } from "@/features/cabins";

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
		<div className="mx-auto mt-8 max-w-6xl">
			<div className="mb-24 grid gap-20 overflow-hidden border border-primary-800 px-10 py-3 md:grid-cols-[3fr_4fr]">
				<div className="relative min-h-[500px]">
					<Image
						src={imageUrl}
						alt={`Cabin ${name}`}
						className="object-cover"
						fill
						sizes="(max-width: 768px) 100vw, 43vw"
						priority
					/>
				</div>

				<div>
					<h3 className="mb-5 bg-primary-950 p-6 pb-1 text-center text-7xl font-black text-accent-100">
						Cabin {name}
					</h3>

					<p className="mb-10 text-lg text-primary-300">
						{description}
					</p>

					<ul className="mb-7 flex flex-col gap-4">
						<li className="flex items-center gap-3">
							<UsersIcon className="h-5 w-5 text-primary-600" />
							<span className="text-lg">
								For up to{" "}
								<span className="font-bold">{maxCapacity}</span>{" "}
								guests
							</span>
						</li>
						<li className="flex items-center gap-3">
							<MapPinIcon className="h-5 w-5 text-primary-600" />
							<span className="text-lg">
								Located in the heart of the{" "}
								<span className="font-bold">Dolomites</span>{" "}
								(Italy)
							</span>
						</li>
						<li className="flex items-center gap-3">
							<EyeSlashIcon className="h-5 w-5 text-primary-600" />
							<span className="text-lg">
								Privacy <span className="font-bold">100%</span>{" "}
								guaranteed
							</span>
						</li>
					</ul>
				</div>
			</div>

			<div>
				<h2 className="mb-10 text-center text-5xl font-semibold text-accent-400">
					Reserve {name} today. Pay on arrival.
				</h2>
			</div>
		</div>
	);
}
