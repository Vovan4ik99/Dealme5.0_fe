import {FieldError, Path, RegisterOptions, UseFormRegister, UseFormTrigger} from "react-hook-form";

export interface IDataPickerProps {
    labelText: string;
    id: string;
    value?: Date;
    register: UseFormRegister<any>;
    trigger: UseFormTrigger<any>;
    error: FieldError | null;
    validationRules?: RegisterOptions<any, Path<any>>;
    onValueChange: (value: Date) => void;
}