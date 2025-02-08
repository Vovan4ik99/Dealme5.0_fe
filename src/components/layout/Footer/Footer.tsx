import React from "react";
import styles from './Footer.module.scss';
import { IFooterProps } from "./footerTypes.ts";

const Footer: React.FC<IFooterProps> = ({isHyphenated, isCentered}) => {

	const renderFooter = () => {
		if (isHyphenated) {
			return (
				<>
					<p>2024 © Copyright Dealme. Wszelkie prawa zastrzeżone.</p>
					<p>Design by: <span>Poprotsky - premium design for your digital products</span></p>
				</>
			)
		}
		return <p>
			2024 © Copyright Dealme. Wszelkie prawa zastrzeżone. Design by: <span>Poprotsky - premium design for your digital products</span>
		</p>
	}

	return (
		<footer className={`${styles['footer']} ${isCentered && styles['footer--centered']}`}>
			{renderFooter()}
		</footer>
	)
}

export default Footer;