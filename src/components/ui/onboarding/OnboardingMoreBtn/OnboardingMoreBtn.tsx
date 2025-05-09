import React from "react";
import { IOnboardingMoreBtnProps } from "@ui/onboarding/OnboardingMoreBtn/onboardingMoreBtnTypes.ts";
import styles from "./OnboardingMoreBtn.module.scss";

const OnboardingMoreBtn: React.FC<IOnboardingMoreBtnProps> = ({ onClick, itemsCount }) => {

	return (
		<button className={ `btn 
							 tab--primary 
							 ${styles['btn']}` }
		        onClick={ onClick }>
			Rozwiń wszystkie (+{itemsCount})
		</button>
	);
};

export default OnboardingMoreBtn;