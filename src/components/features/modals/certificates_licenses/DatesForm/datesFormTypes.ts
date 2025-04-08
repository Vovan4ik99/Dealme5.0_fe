import {
	FieldError,
	UseFormClearErrors,
	UseFormRegister,
	UseFormSetValue,
	UseFormTrigger,
	UseFormUnregister
} from "react-hook-form";

interface IDatesFormData {
	startYear: number;
	endYear: number;
	startMonth: number;
	endMonth: number;
}

export interface IDatesFormProps {
	register: UseFormRegister<any>;
	setValue: UseFormSetValue<any>;
	formData: IDatesFormData;
	trigger: UseFormTrigger<any>;
	checkboxLabel: string;
	clearErrors: UseFormClearErrors<any>;
	unregister: UseFormUnregister<any>;
	errors: {
		startYear?: FieldError;
		endYear?: FieldError;
		startMonth?: FieldError;
		endMonth?: FieldError;
	},
	isOngoingChecked?: boolean;
}