import React from "react";

export interface ISelectOptionProps {
	onClick: () => void;
	value: string;
	info: string | null;
	icon?: React.ReactNode;
}