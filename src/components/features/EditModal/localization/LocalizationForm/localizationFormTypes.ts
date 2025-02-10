import { FieldError, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";

export interface ILocalizationFormState {
	country: string;
	state: string;
	city?: string;
}

export interface ILocalizationFormProps<T extends ILocalizationFormState> {
	formData: Pick<T, "country" | "state" | "city">;
	register: UseFormRegister<T>;
	setValue: UseFormSetValue<T>;
	trigger: UseFormTrigger<T>;
	errors: {
		country?: FieldError;
		state?: FieldError;
		city?: FieldError;
	};
	isCityRequired?: boolean;
}
