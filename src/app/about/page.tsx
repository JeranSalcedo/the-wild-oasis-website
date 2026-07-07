import Image from "next/image";

import about1 from "@/features/about/assets/about-1.jpg";
import about2 from "@/features/about/assets/about-2.jpg";

import { cn } from "@/utils/utils";
import { getCabins } from "@/features/cabins";

import { Heading } from "@/components/Heading";
import { LinkButton } from "@/components/LinkButton";

// revalidate every day
export const revalidate = 86400;

export const metadata = {
	title: "About",
	description: "Learn more about The Wild Oasis",
};

const styles = {
	container: "md:order-none md:col-span-3",
	p: "space-y-4 sm:space-y-6 md:space-y-8",
	img: "flex justify-center md:order-none md:col-span-2",
	button: "order-6 mt-2 text-center sm:mt-3 md:order-none md:col-span-5 md:mt-4",
} as const;

export default async function Page() {
	const cabins = await getCabins();
	const cabinsCount = cabins?.length ?? 0;

	return (
		<div className="mx-10 grid grid-cols-1 items-center gap-y-8 sm:gap-y-12 md:grid-cols-5 md:gap-x-24 md:gap-y-16">
			<div className={cn(styles.container, "order-1")}>
				<Heading>Welcome to The Wild Oasis</Heading>

				<div className={styles.p}>
					<p>
						Where nature&apos;s beauty and comfortable living blend
						seamlessly. Hidden away in the heart of the Italian
						Dolomites, this is your paradise away from home. But
						it&apos;s not just about the luxury cabins. It&apos;s
						about the experience of reconnecting with nature and
						enjoying simple pleasures with family.
					</p>
					<p>
						Our {cabinsCount} luxury cabins provide a cozy base, but
						the real freedom and peace you&apos;ll find in the
						surrounding mountains. Wander through lush forests,
						breathe in the fresh air, and watch the stars twinkle
						above from the warmth of a campfire or your hot tub.
					</p>
					<p>
						This is where memorable moments are made, surrounded by
						nature&apos;s splendor. It&apos;s a place to slow down,
						relax, and feel the joy of being together in a beautiful
						setting.
					</p>
				</div>
			</div>

			<div className={cn(styles.img, "order-2")}>
				<Image
					src={about1}
					alt="Family sitting around a fire pit in front of cabin"
					className="w-full max-w-md rounded-lg"
					placeholder="blur"
					quality={80}
				/>
			</div>

			<div className={cn(styles.img, "order-5")}>
				<Image
					src={about2}
					alt="Family that manages The Wild Oasis"
					className="w-full max-w-md rounded-lg"
					placeholder="blur"
					quality={80}
				/>
			</div>

			<div className={cn(styles.container, "order-4")}>
				<Heading>Managed by our family since 1962</Heading>

				<div className={styles.p}>
					<p>
						Since 1962, The Wild Oasis has been a cherished
						family-run retreat. Started by our grandparents, this
						haven has been nurtured with love and care, passing down
						through our family as a testament to our dedication to
						creating a warm, welcoming environment.
					</p>
					<p>
						Over the years, we&apos;ve maintained the essence of The
						Wild Oasis, blending the timeless beauty of the
						mountains with the personal touch only a family business
						can offer. Here, you&apos;re not just a guest;
						you&apos;re part of our extended family. So join us at
						The Wild Oasis soon, where tradition meets tranquility,
						and every visit is like coming home.
					</p>
				</div>
			</div>

			<div className={styles.button}>
				<LinkButton href="/cabins" type="regular">
					Explore our luxury cabins
				</LinkButton>
			</div>
		</div>
	);
}
