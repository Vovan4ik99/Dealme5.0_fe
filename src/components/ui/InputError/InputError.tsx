import styles from './InputError.module.scss';
import error_icon from '@icons/error_icon.svg';
import React from "react";

interface IInputErrorProps {
	text: string;
}

const InputError: React.FC<IInputErrorProps> = ({text}) => {
	return (
		<div className={styles.error}>
			<img src={error_icon} alt={'error icon'}/>
			<span>{text}</span>
		</div>
	)
}

export default InputError;