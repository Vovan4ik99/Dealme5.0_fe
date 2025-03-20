import styles from "./OnboardingProgressTracker.module.scss";
import React from "react";
import {
	ICategoryWithStatus,
	IOnboardingProgressTrackerProps
} from "@components/layout/OnboardingLayout/OnboardingProgressTracker/onboardingProgressTrackerTypes.ts";
import {
	ONBOARDING_PROGRESS_TRACKER_CATEGORIES
} from "@components/layout/OnboardingLayout/OnboardingProgressTracker/onboardingProgressTrackerCategories.ts";
import {
	CategoryStatus
} from "@components/layout/OnboardingLayout/OnboardingProgressCategory/onboardingProgressCategoryTypes.ts";
import OnboardingProgressCategory
	from "@components/layout/OnboardingLayout/OnboardingProgressCategory/OnboardingProgressCategory.tsx";

const OnboardingProgressTracker: React.FC<IOnboardingProgressTrackerProps> = ({ step, maxSteps, userType }) => {

	const getOnboardingCategoriesWithStatus = (): ICategoryWithStatus[] => {
		const categories = ONBOARDING_PROGRESS_TRACKER_CATEGORIES[userType];

		let currentStep = 0;

		return categories.map(({ category, subcategories }) => {
			let categoryHasActive = false;

			const updatedSubcategories = subcategories.map((name) => {
				let status: CategoryStatus;

				if (currentStep < step) {
					status = 'completed';
				} else if (currentStep === step) {
					status = 'active';
					categoryHasActive = true;
				} else {
					status = 'upcoming';
				}

				currentStep++;
				return { name, status };
			});

			let categoryStatus: CategoryStatus;
			if (updatedSubcategories.every((s) => s.status === 'completed')) {
				categoryStatus = 'completed';
			} else if (categoryHasActive) {
				categoryStatus = 'active';
			} else {
				categoryStatus = 'upcoming';
			}

			return {
				category,
				subcategories: updatedSubcategories,
				status: categoryStatus,
			};
		});
	}

	const renderCategories = () => {
		const categories = getOnboardingCategoriesWithStatus();

		return categories.map(({ category, subcategories, status }) => {
			const mappedCategory = <OnboardingProgressCategory key={ category }
			                                                   kind="category"
			                                                   status={ status }
			                                                   subcategoriesCount={ subcategories.length }
			                                                   title={ category }/>;
			if (status === 'active') {
				return <div className={ styles['tracker__category'] } key={ category }>
					{ mappedCategory }
					{ subcategories.map(({ name, status }) => {
						return <OnboardingProgressCategory key={ name }
						                                   kind="subcategory"
						                                   status={ status }
						                                   title={ name }/>;
					})}
				</div>
			}
			return mappedCategory;
		});
	};

	return (
		<div className={ styles['tracker'] }>
			<div className={ styles['tracker__progress'] }>
				<div className={ styles['tracker__line'] }>
					<span style={ { width: `${ (step / maxSteps) * 100 }%` } }></span>
				</div>
				<span>{ (step / maxSteps) * 100 } / 100%</span>
			</div>
			<div className={ styles['tracker__categories'] }>
				{ renderCategories() }
			</div>
		</div>
	);
};

export default OnboardingProgressTracker;