import { formatDistance, parseISO } from "date-fns";

export const formatDateFromNow = (date: string) =>
	formatDistance(parseISO(date), new Date(), {
		addSuffix: true,
	})
		.replace("about ", "")
		.replace("in", "In");
