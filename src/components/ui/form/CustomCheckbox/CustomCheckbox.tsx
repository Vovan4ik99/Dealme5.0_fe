import styles from './CustomCheckbox.module.scss';
import React from "react";
import { ICustomCheckboxProps } from "@ui/form/CustomCheckbox/customCheckboxTypes.ts";
import checkbox_checked from '@icons/auth/checkbox_checked.svg';
import InputError from "@ui/form/InputError/InputError.tsx";

const CustomCheckbox: React.FC<ICustomCheckboxProps> = ({
	                                                        label,
	                                                        onChange,
	                                                        isChecked,
	                                                        isError = false,
	                                                        errorMessage,
	                                                        id,
	                                                        register
                                                        }) => {

	return (
		<>
			<label htmlFor={id} className={styles['checkbox']}>
				<input
					id={id}
					className={`${styles['checkbox__input']}`}
					type="checkbox"
					checked={isChecked}
					{...register}
					onChange={(e) => {
						register?.onChange?.(e);
						onChange?.();
					}}
				/>
				<span className={`${styles['checkbox__custom']} ${isError && styles['checkbox__custom--error']}`}>
					<img src={checkbox_checked} alt={'checkbox'}/>
				</span>
				<p className={styles['checkbox__text']}>
					{label}
				</p>
			</label>
			{(isError && errorMessage) && <InputError text={errorMessage}/>}
		</>
	);
}

export default CustomCheckbox;