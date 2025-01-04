import styles from './InputError.module.scss';
import React from "react";
import error_icon from "@icons/auth/error_icon.svg";

interface IInputErrorProps {
	text: string;
}

const InputError: React.FC<IInputErrorProps> = ({text}) => {
	return (
		<div className={styles.error}>
			<img src={error_icon} alt="error"/>
			<span>{text}</span>
		</div>
	)
}

export default InputError;