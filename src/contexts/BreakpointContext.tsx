"use client";

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

type BreakpointProviderProps = {
	children: ReactNode;
};

const breakpoints = {
	sm: "(min-width: 640px)",
	md: "(min-width: 768px)",
	lg: "(min-width: 1024px)",
	xl: "(min-width: 1280px)",
	"2xl": "(min-width: 1536px)",
} as const;

type BreakpointState = Record<keyof typeof breakpoints, boolean>;

const initialState: BreakpointState = {
	sm: false,
	md: false,
	lg: false,
	xl: false,
	"2xl": false,
};

const BreakpointContext = createContext<BreakpointState | undefined>(undefined);

export const BreakpointProvider = ({ children }: BreakpointProviderProps) => {
	const [state, setState] = useState(initialState);

	useEffect(() => {
		const mediaQueries = Object.fromEntries(
			Object.entries(breakpoints).map(([key, query]) => [
				key,
				window.matchMedia(query),
			]),
		) as Record<keyof typeof breakpoints, MediaQueryList>;

		const update = () => {
			setState({
				sm: mediaQueries.sm.matches,
				md: mediaQueries.md.matches,
				lg: mediaQueries.lg.matches,
				xl: mediaQueries.xl.matches,
				"2xl": mediaQueries["2xl"].matches,
			});
		};

		update();

		Object.values(mediaQueries).forEach((query) => {
			query.addEventListener("change", update);
		});

		return () => {
			Object.values(mediaQueries).forEach((query) => {
				query.removeEventListener("change", update);
			});
		};
	}, []);

	return (
		<BreakpointContext.Provider value={state}>
			{children}
		</BreakpointContext.Provider>
	);
};

export const useBreakpoint = () => {
	const context = useContext(BreakpointContext);
	if (!context)
		throw new Error(
			"useBreakpoint must be used within a BreakpointProvider",
		);

	return context;
};
