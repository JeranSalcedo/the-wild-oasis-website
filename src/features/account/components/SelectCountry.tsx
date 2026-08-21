import { getCountries } from "../api/countries.api";

import { CountrySelect } from "./CountrySelect";

type SelectCountryProps = {
	id: string;
	name: string;
	className?: string;
	defaultCountry?: string;
};

export const SelectCountry = async ({
	id,
	name,
	className = "",
	defaultCountry = "",
}: SelectCountryProps) => {
	const countries = await getCountries();

	return (
		<CountrySelect
			id={id}
			name={name}
			className={className}
			defaultCountry={defaultCountry}
			countries={countries}
		/>
	);
};
