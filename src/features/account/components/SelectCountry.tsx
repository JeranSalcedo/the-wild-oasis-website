import { getCountries } from "../api/countries.api";

type SelectCountryProps = {
	id: string;
	name: string;
	className?: string;
};

export const SelectCountry = async ({
	id,
	name,
	className = "",
}: SelectCountryProps) => {
	const countries = await getCountries();

	return (
		<select id={id} name={name} className={className}>
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
