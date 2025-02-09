import { FieldError, Path, RegisterOptions, UseFormRegister, UseFormTrigger } from "react-hook-form";

export interface ISelectItem {
	text: string;
	info?: string | null;
}

export interface ISelectInputProps<T extends Record<string, any>> {
	labelText: string;
	text: string | null;
	id: Path<T>;
	additionalText?: string;
	register: UseFormRegister<T>;
	trigger: UseFormTrigger<T>;
	error: FieldError | null;
	selectItems: ISelectItem[];
	validationRules?: RegisterOptions<T, Path<T>>;
	onValueChange: (value: any) => void;
}

