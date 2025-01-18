import styles from './CustomInput.module.scss';
import React from "react";
import {CustomInputProps} from "@ui/CustomInput/customInputTypes.ts";
import InputError from "@ui/InputError/InputError.tsx";
import {CUSTOM_INPUT_PRESETS} from "@ui/CustomInput/customInputPresets.ts";

const CustomInput: React.FC<CustomInputProps> = (props) => {

	const combinedProps = props.preset
		? { ...CUSTOM_INPUT_PRESETS[props.preset], ...props }
		: props;

	const {
		id,
		type,
		placeholder,
		autoComplete,
		errorMessage,
		labelText,
		register,
		validation,
		onChange,
		existedValue
	} = combinedProps;

	const isControlled = existedValue !== undefined && onChange !== undefined;

	const registerProps = register
		? register(id ?? '', validation ?? {}) || {}
		: {};

	return (
		<div className={styles['item']}>
			<input
				className={`${styles['item__input']} ${errorMessage && styles['item__input--error']}`}
				id={id}
				type={type}
				placeholder={placeholder}
				autoComplete={autoComplete}
				{...(isControlled
					? {
						value: existedValue,
						onChange: (e) => onChange(e.target.value),
					}
					: registerProps)}
			/>
			{errorMessage && <InputError text={errorMessage}/>}
			<label className={styles['item__label']} htmlFor={id}>{labelText}</label>
		</div>
	);
}

export default CustomInput;