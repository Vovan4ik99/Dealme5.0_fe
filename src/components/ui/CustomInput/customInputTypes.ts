import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import {inputPreset} from "@ui/CustomInput/inputPreset.ts";

export type PresetType = typeof inputPreset[number];

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