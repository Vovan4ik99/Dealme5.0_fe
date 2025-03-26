import React, { useEffect, useState } from "react";
import { IIndustryItemProps } from "./industryItemTypes.ts";
import styles from '@components/features/freelancer-onboarding/Onboarding.module.scss';
import SubIndustryItem from "@components/features/freelancer-onboarding/items/SubIndustryItem/SubIndustryItem.tsx";
import AnimatedStep from "@components/features/freelancer-onboarding/steps/AnimatedStep/AnimatedStep.tsx";
import arrow_right from '@icons/onboarding/arrow_right.svg'

const IndustryItem: React.FC<IIndustryItemProps> = ({text, subIndustries, selectedSubIndustries, onChange, isSearchActive, isInSearchRange}) => {

	const [isActive, setIsActive] = useState<boolean>(false);
	const [isDisplayed, setIsDisplayed] = useState<boolean>(true);

	useEffect(() => {
		if (isSearchActive) {
			setIsDisplayed(isInSearchRange);
			setIsActive(true);
		}
	}, [isSearchActive, isInSearchRange]);

	useEffect(() => {
		if (!isSearchActive) {
			setIsDisplayed(true);
			setIsActive(false);
		}
	}, [isSearchActive]);

	return (
		(isDisplayed && <>
			<button
				className={`${styles['onboarding-step__category']} ${isActive && styles['onboarding-step__category--active']}`}
				onClick={() => setIsActive((prevState) => !prevState)}>
				<div className={styles['onboarding-step__category-wrapper']}>
					<div className={styles['onboarding-step__category-img']}>
						<img src={arrow_right} alt={'arrow'}/>
					</div>
					<p className={styles['onboarding-step__category-text']}>{text}</p>
				</div>
			</button>
			{(isActive && subIndustries.length > 0) &&
                <AnimatedStep>
                    <div className={`${styles['onboarding-step__items']} ${styles['onboarding-step__items--m0']}`}>
						{subIndustries.map((subIndustry) => {
							const isSelected = selectedSubIndustries.includes(subIndustry.id);
							return <SubIndustryItem key={subIndustry.id} text={subIndustry.name} info={subIndustry.info}
							                        isSelected={isSelected} onChange={() => onChange(subIndustry.id)}/>
						})}
                    </div>
                </AnimatedStep>}
		</>)
	)
};

export default IndustryItem;