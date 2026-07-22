import type { Country } from "../types/country.types";
import type { CountryDataObject } from "../types/country-data.type";

export const mapCountry = (country: CountryDataObject): Country => ({
	name: country.names.common,
	flag: country.flag.url_svg,
});
