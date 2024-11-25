import loading_spinner from "@icons/tail-spin.svg";
import React from "react";
import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {

	return (
		<div className={styles['spinner']}>
			<img src={loading_spinner} alt={'loading spinner'}/>
		</div>
	)
}

export default LoadingSpinner;