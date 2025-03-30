import React from "react";
import {IOnboardingModalCategoryProps} from "./onboardingModalCategoryTypes.ts";
import styles from './OnboardingModalCategory.module.scss';
import success_icon from '@icons/alert/success_icon.svg';

const OnboardingModalCategory: React.FC<IOnboardingModalCategoryProps> = ({kind, text, children}) => {

	switch (kind) {
		case 'default':
			return <p className={styles['category']}>{text}</p>
		case 'active':
			return <div className={`${styles['category']} ${styles['category--active']}`}>
				<p>{text}</p>
				{children}
			</div>
		case 'withIcon':
			return <div className={styles['category__wrapper']}>
				<div className={styles['category__icon']}></div>
				<p className={styles['category__text']}>{text}</p>
			</div>
		case 'withIconActive':
			return <div className={styles['category__wrapper']}>
				<div className={`${styles['category__icon']} ${styles['category__icon--active']}`}>
					<span></span>
				</div>
				<p className={`${styles['category__text']} ${styles['category__text--active']}`}>{text}</p>
			</div>
		case 'finished':
			return <div className={styles['category__wrapper']}>
				<div className={`${styles['category__icon']} ${styles['category__icon--finished']}`}>
					<img src={success_icon} alt={'success'}/>
				</div>
				<p className={`${styles['category__text']} ${styles['category__text--finished']}`}>{text}</p>
			</div>
		default:
			return <></>
	}
}

export default OnboardingModalCategory;