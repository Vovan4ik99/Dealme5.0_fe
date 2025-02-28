import { FieldError, RegisterOptions, UseFormRegister, UseFormTrigger } from "react-hook-form";

export interface ICustomTextAreaProps {
	label: string;
	maxSymbols: number;
	fontSize?: number;
	fontWeight?: number;
	placeholder: string;
	minHeight?: number;
	onTextChange: (text: string) => void;
	value: string | undefined;
	error?: FieldError;
	register: UseFormRegister<any>;
	trigger: UseFormTrigger<any>;
	validation?: RegisterOptions;
	labelColor: LabelColor;
	id: string;
}

export type LabelColor = 'gray' | 'black';