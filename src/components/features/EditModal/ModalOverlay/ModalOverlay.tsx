import styles from './ModalOverlay.module.scss';
import React, {useEffect, useState} from "react";
import {IModalOverlayProps} from "./modalOverlayTypes.ts";

const ModalOverlay: React.FC<IModalOverlayProps> = ({zIndex}) => {

	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
		return () => setIsVisible(false);
	}, []);

	return (
		<div style={{zIndex}} className={`${styles.overlay} ${isVisible ? styles.show : styles.hide}`}></div>
	)
}

export default ModalOverlay;