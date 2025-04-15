import {RegisterOptions, UseFormRegister} from "react-hook-form";

export interface INumberInputProps{
    id: string;
    labelText: string;
    errorMessage?: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    validation?: RegisterOptions;
    onChange: (value: number) => void;
    existedValue?: number;
}