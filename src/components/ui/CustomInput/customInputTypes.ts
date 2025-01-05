import React from "react";
import {RegisterOptions, UseFormRegister} from "react-hook-form";

export type PresetType = 'email' | 'password' | 'firstName' | 'lastName' | 'company';

interface IBaseInputProps {
	errorMessage?: string;
	register: UseFormRegister<any>;
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
}

export type CustomInputProps = IPresetProps | ICustomProps;