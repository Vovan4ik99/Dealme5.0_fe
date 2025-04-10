import React from "react";
import {UseFormRegisterReturn} from "react-hook-form";

export interface ICustomCheckboxProps {
	label: React.ReactNode;
	isChecked?: boolean;
	onChange?: () => void;
	isError?: boolean;
	errorMessage?: string;
	id: string;
	register?: UseFormRegisterReturn<any>;
}