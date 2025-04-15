import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

export type PresetType = 'email' | 'password' | 'firstName' | 'lastName' | 'company' | 'certificateName'
| 'certificateOrganization' | 'videoTitle' | 'jobTitle' | 'workExperienceCompany' | 'city';

interface IBaseInputProps {
	errorMessage?: string;
	register: UseFormRegister<any> | null;
	validation?: RegisterOptions;
}

interface IPresetProps extends IBaseInputProps {
	preset: PresetType;
}

interface ICustomProps extends IBaseInputProps {
	id: string;
	type: React.HTMLInputTypeAttribute;
	placeholder: string;
	autoComplete?: string;
	labelText: string;
	preset?: never;
	onChange?: (value: string) => void;
	existedValue?: string;
}

export type CustomInputProps = IPresetProps | ICustomProps;