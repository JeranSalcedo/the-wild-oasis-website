"use client";

import { useState } from "react";

type TextExpanderProps = {
	text: string;
};

export const TextExpander = ({ text }: TextExpanderProps) => {
	const [expanded, setExpanded] = useState(false);
	const displayText = expanded
		? text
		: text.split(" ").slice(0, 40).join(" ") + "...";

	return (
		<span>
			{displayText}{" "}
			<button
				className="border-b border-primary-700 leading-3 text-primary-700 sm:pb-0.5 md:pb-1"
				onClick={() => setExpanded((expanded) => !expanded)}
			>
				{expanded ? "Show less" : "Show more"}
			</button>
		</span>
	);
};
