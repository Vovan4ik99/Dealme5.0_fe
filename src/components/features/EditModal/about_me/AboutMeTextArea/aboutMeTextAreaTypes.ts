import { FieldError, RegisterOptions, UseFormRegister, UseFormTrigger } from "react-hook-form";

export interface IAboutMeTextAreaProps {
	label: string;
	maxSymbols: number;
	fontSize?: number;
	fontWeight?: number;
	placeholder: string;
	minHeight?: number;
	onTextChange: (text: string) => void;
	value: string;
	error?: FieldError;
	register: UseFormRegister<any>;
	trigger: UseFormTrigger<any>;
	validation?: RegisterOptions;
	id: string;
}