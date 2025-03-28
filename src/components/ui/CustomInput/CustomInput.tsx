import styles from './CustomInput.module.scss';
import React from "react";
import { CustomInputProps } from "@ui/CustomInput/customInputTypes.ts";
import InputError from "@ui/InputError/InputError.tsx";
import { CUSTOM_INPUT_PRESETS } from "@ui/CustomInput/customInputPresets.ts";

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

	const isPhoneInput = id === 'phone';

	const formatPhone = (raw: string) => {
		const digits = raw.replace(/\D/g, '').slice(2);
		const parts = [];

		for (let i = 0; i < digits.length && i < 9; i += 3) {
			parts.push(digits.slice(i, i + 3));
		}

		return '+48 ' + parts.join('-');
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!onChange) {
			console.log('onChange is not defined');
			return;
		}
		const input = e.target.value;
		const formatted = formatPhone(input);
		onChange(formatted);
	};

	const handleFocus = () => {
		if (!onChange) {
			console.log('onChange is not defined');
			return;
		}
		if (!existedValue || !existedValue.startsWith('+48')) {
			onChange('+48 ');
		}
	};

	return (
		<div className={ styles['item'] }>
			<input
				className={ `${ styles['item__input'] } ${ errorMessage && styles['item__input--error'] }` }
				id={ id }
				type={ type }
				placeholder={ placeholder }
				autoComplete={ autoComplete }
				onFocus={ isPhoneInput ? handleFocus : undefined }
				maxLength={ isPhoneInput ? 17 : undefined }
				{ ...(isControlled
					? {
						value: existedValue,
						onChange: (e) => isPhoneInput
							? handleChange(e)
							: onChange(e.target.value)
					}
					: registerProps) }
			/>
			{ errorMessage && <InputError text={ errorMessage }/> }
			<label className={ styles['item__label'] } htmlFor={ id }>{ labelText }</label>
		</div>
	);
}

export default CustomInput;