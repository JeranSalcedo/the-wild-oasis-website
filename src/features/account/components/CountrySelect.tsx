"use client";

import { useFormStatus } from "react-dom";

import { Country } from "../types/country.types";

type CountrySelectProps = {
	id: string;
	name: string;
	className?: string;
	defaultCountry?: string;
	countries: Country[];
};

export const CountrySelect = ({
	id,
	name,
	className = "",
	defaultCountry = "",
	countries,
}: CountrySelectProps) => {
	const { pending } = useFormStatus();

	return (
		<select
			id={id}
			name={name}
			className={`${className} disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400`}
			defaultValue={defaultCountry}
			disabled={pending}
		>
			<option value="">Select country...</option>
			{countries.map((country) => (
				<option
					key={country.name}
					value={`${country.name}%${country.flag}`}
				>
					{country.name}
				</option>
			))}
		</select>
	);
};
