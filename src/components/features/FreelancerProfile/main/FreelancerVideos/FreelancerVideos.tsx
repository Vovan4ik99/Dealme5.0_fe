import styles from './FreelancerVideos.module.scss';
import {
	NavbarSectionKey
} from "@constants/freelancerInnerNavbarSections.ts";
import React, { useContext, useState } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";

const FreelancerVideos = () => {

	const SECTION_ID: NavbarSectionKey = 'videos';
	const {user} = useContext(AuthContext);

	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const handleNavigateClick = (direction: 'left' | 'right') => {
		if(direction === 'left') {
			setCurrentIndex((prev) => prev - 1);
		} else {
			setCurrentIndex((prev) => prev + 1);
		}
	};

	return (
		<section id={SECTION_ID} className={styles['videos']}>
			{/*<header className={styles['videos__header']}>*/}
			{/*	<div className={styles['videos__heading']}>*/}
			{/*		<h2 className={'title title--profile'}>{NAVBAR_SECTIONS[SECTION_ID]}</h2>*/}
			{/*		<div className={styles['videos__buttons']}>*/}
			{/*			<ActionBtn kind={'Navigate Left'}*/}
			{/*			           key={'Left Btn'}*/}
			{/*			           withBorder={true}*/}
			{/*			           backgroundColor={'white'}*/}
			{/*			           disabled={currentIndex === 0}*/}
			{/*			           onClick={() => handleNavigateClick('left')}/>*/}
			{/*			<ActionBtn kind={'Navigate Right'}*/}
			{/*			           key={'Right Btn'}*/}
			{/*			           withBorder={true}*/}
			{/*			           backgroundColor={'white'}*/}
			{/*			           disabled={currentIndex + 5 >= user.salesTools.length}*/}
			{/*			           onClick={() => handleNavigateClick('right')}/>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*	<div className={styles['tools__buttons']}>*/}
			{/*		<ActionBtn kind={'Add'}*/}
			{/*		           key={'Add'}*/}
			{/*		           withBorder={true}*/}
			{/*		           backgroundColor={'white'}*/}
			{/*		           onClick={handleAddTools}/>*/}
			{/*		<ActionBtn kind={'Edit'}*/}
			{/*		           key={'Edit'}*/}
			{/*		           withBorder={true}*/}
			{/*		           backgroundColor={'white'}*/}
			{/*		           onClick={onSalesToolsEdit}/>*/}
			{/*	</div>*/}
			{/*</header>*/}
		</section>
	);
}

export default FreelancerVideos;