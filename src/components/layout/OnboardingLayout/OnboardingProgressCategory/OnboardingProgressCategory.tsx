import styles from "./OnboardingProgressCategory.module.scss";
import React from "react";
import { OnboardingProgressCategoryProps } from "./onboardingProgressCategoryTypes.ts";
import success_icon from '@icons/alert/success_icon.svg';

const OnboardingProgressCategory: React.FC<OnboardingProgressCategoryProps> = ({
	                                                                               kind,
	                                                                               status,
	                                                                               subcategoriesCount,
	                                                                               title
                                                                               }) => {

	const getIcon = (iconType: 'gray' | 'success' | 'checked') => {
		switch (iconType) {
			case 'gray':
				return <div className={ `${ styles['category__icon'] } ${ styles['category__icon--gray'] }` }></div>;
			case 'success':
				return <div className={ `${ styles['category__icon'] } ${ styles['category__icon--success'] }` }>
					<img src={ success_icon } alt={ 'success icon' }/>
				</div>;
			case 'checked':
				return <div className={ `${ styles['category__icon'] } ${ styles['category__icon--checked'] }` }>
					<div className={ styles['category__circle'] }></div>
				</div>;
			default:
				return <></>;
		}
	};

	const getCategory = () => {
		if (kind === 'category') {
			if (status === 'active') {
				return <div className={ `${ styles['category'] } ${ styles['category--main-active'] }` }>
					{ title } ({ subcategoriesCount })
				</div>
			} else {
				return <div className={ `${ styles['category'] } ${ styles['category--main-default'] }` }>
					{ status === 'completed' && getIcon('success') }
					{ title } ({ subcategoriesCount })
				</div>;
			}
		} else {
			if (status === 'active') {
				return <div className={ `${ styles['category'] } ${ styles['category--sub-active'] }` }>
					{ getIcon('checked') }
					{ title }
				</div>
			} else {
				return <div className={ `${ styles['category'] } ${ styles['category--sub-default'] }` }>
					{ status === 'completed' ? getIcon('success') : getIcon('gray') }
					{ title }
				</div>
			}
		}
	};

	return (
		<>
			{ getCategory() }
		</>
	);
};

export default OnboardingProgressCategory;