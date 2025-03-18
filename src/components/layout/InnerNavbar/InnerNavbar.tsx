import styles from "./InnerNavbar.module.scss";
import { NAVBAR_SECTIONS } from "@constants/freelancerInnerNavbarSections.ts";
import { Link } from "react-scroll";
import React, { useEffect, useRef, useState } from "react";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";

const InnerNavbar = () => {
	/**
	 * Necessary check for missing sections to ensure that id in every section is correct and could
	 * be used by that navbar
	 */
	const [ currentIndex, setCurrentIndex ] = useState<number>(0);
	const [ elementWidths, setElementWidths ]= useState<number[]>([]);
	const itemRefs = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		Array.from(itemRefs.current?.values()).map((el) => {
			elementWidths.push(el.clientWidth + 7);
			setElementWidths(elementWidths);
		});
	}, [ elementWidths, itemRefs ]);

	useEffect(() => {
		const missingSections = Object.keys(NAVBAR_SECTIONS).filter(
			(key) => !document.getElementById(key)
		);

		if (missingSections.length > 0) {
			console.warn(`This sections are missing in profile: ${ missingSections.join(", ") }`);
		}
	}, [ ] );

	const handleElementMove = () => {
		return elementWidths
			.slice(0, currentIndex)
			.reduce((acc, width) => acc + width, 0);
	}

	const handleNavigationClick = (direction: 'left' | 'right') => {
		setCurrentIndex((prev) => direction === "left" ? prev - 1 : prev + 1);
	}

	const renderNavbarLinks = () => {
		return Object.entries(NAVBAR_SECTIONS).map(([key, name]) => (
			<div ref={ (el) => el && itemRefs.current.push(el) }
				key={ key }
				className={ styles["navbar__btn"] }>
			<Link
				to={ key }
				smooth={ true }
				duration={300}
				offset={-50}
				className={ styles["navbar__item"]  }
			>
				{ name }
			</Link>
			</div>
		));
	};

	return (
		<nav className={ styles.navbar }>
			<div className={ styles["navbar__list"] }>
				<div style={ { transform: `translateX(-${ handleElementMove() }px)` } }
					 className={ styles["navbar__inner"] }>
					{ renderNavbarLinks() }
				</div>
			</div>
				<ActionBtn kind={ 'Navigate Left' }
						   key={ 'Left Btn' }
						   withBorder={ true }
						   backgroundColor={ 'white' }
						   disabled={ currentIndex === 0 }
						   onClick={ () => handleNavigationClick('left') }/>
				<ActionBtn kind={ 'Navigate Right' }
						   key={ 'Right Btn' }
						   withBorder={ true }
						   backgroundColor={ 'white' }
						   disabled={ currentIndex === ( elementWidths.length / 2 ) - 1 }
						   onClick={ () => handleNavigationClick('right') }/>
		</nav>
	)
};

export default InnerNavbar;