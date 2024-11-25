import React, {useEffect, useState} from "react";
import {ISalesToolKindItemProps} from "./salesToolKindItemTypes.ts";
import styles from "../../Onboarding.module.scss";
import arrow_right from "@icons/arrow_right.svg";
import AnimatedStep from "../../steps/AnimatedStep/AnimatedStep.tsx";
import SalesToolItem from "../SalesToolItem/SalesToolItem.tsx";
import {getPictureForSalesTools} from "../../../../../utils/salesToolsPictureUtils.ts";

const SalesToolKindItem: React.FC<ISalesToolKindItemProps> = ({text, salesTools, selectedSalesTools, onChange,
	                                                              isSearchActive, isInSearchRange}) => {

	const [isActive, setIsActive] = useState<boolean>(false);
	const [isDisplayed, setIsDisplayed] = useState<boolean>(true);

	useEffect(() => {
		if (!isSearchActive) {
			setIsDisplayed(true);
			setIsActive(false);
		}
	}, [isSearchActive]);

	useEffect(() => {
		if (isSearchActive) {
			setIsDisplayed(isInSearchRange);
			setIsActive(true);
		}
	}, [isSearchActive, isInSearchRange]);

	return (
		(isDisplayed && <>
            <button
                className={`${styles['onboarding-step__category']} ${isActive && styles['onboarding-step__category--active']}`}
                onClick={() => setIsActive((prevState) => !prevState)}>
                <div className={styles['onboarding-step__category-wrapper']}>
                    <div className={styles['onboarding-step__category-img']}>
                        <img className={styles['onboarding-step__category-img']} src={arrow_right} alt={'arrow right'}/>
                    </div>
                    <p className={styles['onboarding-step__category-text']}>{text}</p>
                </div>
            </button>
			{(isActive && salesTools.length > 0) &&
                <AnimatedStep>
                    <div className={`${styles['onboarding-step__items']} ${styles['onboarding-step__items--m0']}`}>
						{salesTools.map((salesTool) => {
							const isSelected = selectedSalesTools.includes(salesTool.id);
							return <SalesToolItem key={salesTool.id} text={salesTool.toolName} picture={getPictureForSalesTools(salesTool.toolName)}
							                        isSelected={isSelected} onChange={() => onChange(salesTool.id)}/>
						})}
                    </div>
                </AnimatedStep>}
        </>)
	)
};

export default SalesToolKindItem;