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
		const baseClass = styles['category__icon'];
		switch (iconType) {
			case 'gray':
				return <div className={ `${ baseClass } ${ styles['category__icon--gray'] }` }/>;
			case 'success':
				return <div className={ `${ baseClass } ${ styles['category__icon--success'] }` }>
					<img src={ success_icon } alt={ 'success icon' }/>
				</div>;
			case 'checked':
				return <div className={ `${ baseClass } ${ styles['category__icon--checked'] }` }>
					<div className={ styles['category__circle'] }/>
				</div>;
			default:
				return <></>;
		}
	};

	const getCategory = () => {
		const isCategory = kind === 'category';
		const isActive = status === 'active';
		const isCompleted = status === 'completed';

		const baseClass = styles['category'];
		const statusClass = isCategory
			? isActive
				? styles['category--main-active']
				: styles['category--main-default']
			: isActive
				? styles['category--sub-active']
				: styles['category--sub-default'];

		const icon = isCategory
			? isCompleted
				? getIcon('success')
				: undefined
			: isActive
				? getIcon('checked')
				: isCompleted
					? getIcon('success')
					: getIcon('gray');

		return (
			<div className={ `${ baseClass } ${ statusClass }` }>
				{ icon }
				{ title } {isCategory && `(${ subcategoriesCount })` }
			</div>
		);
	};

	return (
		<>
			{ getCategory() }
		</>
	);
};

export default OnboardingProgressCategory;