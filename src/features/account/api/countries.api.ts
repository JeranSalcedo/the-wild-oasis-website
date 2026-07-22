import type { CountryData } from "../types/country-data.type";
import type { Country } from "../types/country.types";

import { mapCountry } from "./countries.mapper";

export const getCountries = async (): Promise<Country[]> => {
	const countries: Country[] = [];

	let offset = 0;
	const limit = 100;

	while (true) {
		const response = await fetch(
			`https://api.restcountries.com/countries/v5?response_fields=names.common,flag.url_svg&limit=${limit}&offset=${offset}`,
			{
				headers: {
					Authorization: process.env.RESTCOUNTRIES_API_KEY!,
				},
			},
		);

		if (!response.ok) {
			throw new Error("Could not fetch countries");
		}

		const data: CountryData = await response.json();

		countries.push(...data.data.objects.map(mapCountry));

		if (!data.data.meta.more) break;

		offset += limit;
	}

	return countries;
};
