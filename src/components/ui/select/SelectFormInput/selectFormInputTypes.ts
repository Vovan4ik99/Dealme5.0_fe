import { FieldError, Path, RegisterOptions, UseFormRegister, UseFormTrigger } from "react-hook-form";

export interface ISelectItem {
	text: string;
	info?: string | null;
}

interface IBaseFormInputProps<T extends Record<string, any>> {
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
	onDelete?: never;
}

interface ISelectManyInputs <T extends Record<string, any>>{
	onDelete: (id: string) => void;
	text: string[] | null;
	labelText: string;
	id: Path<T>;
	additionalText?: string;
	register: UseFormRegister<T>;
	trigger: UseFormTrigger<T>;
	error: FieldError | null;
	selectItems: ISelectItem[];
	validationRules?: RegisterOptions<T, Path<T>>;
	onValueChange: (value: any) => void;
}

export type ISelectFormInputProps <T extends Record<string, any>> = IBaseFormInputProps<T> | ISelectManyInputs<T>;
