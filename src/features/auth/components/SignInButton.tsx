import Image from "next/image";

import { signInAction } from "../actions/sign-in";

type SignInButtonProps = {
	callbackUrl: string;
};

export const SignInButton = ({ callbackUrl }: SignInButtonProps) => {
	const action = signInAction.bind(null, callbackUrl);

	return (
		<form action={action}>
			<button className="flex items-center gap-3 border border-primary-300 px-6 py-3 font-medium hover:text-accent-400 focus:outline-none focus:outline focus:outline-4 focus:outline-offset-4 focus:outline-accent-300 sm:gap-4 sm:px-8 sm:py-3.5 md:gap-5 md:px-10 md:py-4">
				<Image
					className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
					src="https://authjs.dev/img/providers/google.svg"
					alt="Google logo"
					height={24}
					width={24}
				/>
				<span>Continue with Google</span>
			</button>
		</form>
	);
};
