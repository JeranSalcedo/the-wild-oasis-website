export type CountryDataObject = {
	names: { common: string };
	flag: { url_svg: string };
	_meta: { lastUpdatedTimeStamp: number };
};

export type CountryData = {
	data: {
		objects: CountryDataObject[];
		meta: {
			total: number;
			count: number;
			limit: number;
			offset: number;
			more: boolean;
			request_id: string;
			duration: number;
		};
	};
};
