"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

import type { DateRange } from "@daypicker/react";

import { differenceInCalendarDays } from "date-fns";

type ReservationProviderProps = {
	children: ReactNode;
};

type ReservationContextType = {
	range: DateRange | undefined;
	rangeSelected: boolean;
	nightsCount: number;
	isValid: boolean;
	setIsValid: Dispatch<SetStateAction<boolean>>;
	setRange: Dispatch<SetStateAction<DateRange | undefined>>;
	resetRange: () => void;
};

const initialState = { from: undefined, to: undefined };

const ReservationContext = createContext<ReservationContextType | undefined>(
	undefined,
);

export const ReservationProvider = ({ children }: ReservationProviderProps) => {
	const [range, setRange] = useState<DateRange | undefined>(initialState);
	const [isValid, setIsValid] = useState(false);

	const [rangeSelected, nightsCount] = useMemo(() => {
		if (!range?.from || !range?.to) return [false, 0] as const;

		return [true, differenceInCalendarDays(range.to, range.from)] as const;
	}, [range]);

	const resetRange = () => setRange(initialState);

	return (
		<ReservationContext.Provider
			value={{
				range,
				rangeSelected,
				nightsCount,
				isValid,
				setIsValid,
				setRange,
				resetRange,
			}}
		>
			{children}
		</ReservationContext.Provider>
	);
};

export const useReservation = () => {
	const context = useContext(ReservationContext);
	if (!context)
		throw new Error(
			"useReservation must be used within a ReservationProvider",
		);

	return context;
};
