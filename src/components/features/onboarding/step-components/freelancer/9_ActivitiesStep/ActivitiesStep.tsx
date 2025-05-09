import styles from './ActivitiesStep.module.scss';
import { ReactComponent as InfoIcon } from "@icons/named_exported/info_icon.svg";
import React, { useEffect, useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import { IActivity } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import ActivityItem
	from "@components/features/onboarding/step-components/freelancer/9_ActivitiesStep/ActivityItem/ActivityItem.tsx";

const ActivitiesStep: React.FC<IStepComponentProps<IFreelancerData>> = ({ userData, onSubmit }) => {

	const { patchActivities, getActivities } = useFreelancerOnboardingService();

	const [ selectedActivities, setSelectedActivities ] = useState<Map<number, number>>(new Map());
	const [ activities, setActivities ] = useState<IActivity[]>([]);

	useEffect(() => {
		getActivities()
			.then(setActivities)
			.catch(console.error);
	}, [ getActivities ]);

	useEffect(() => {
		if (userData.selectedActivities.length === 0) return;

		const userActivities = activities.filter(activity =>
			userData.selectedActivities.some(
				selectedActivity => selectedActivity.name === activity.name
			)
		);

		const userActivitiesMap = new Map(
			userActivities.map(activity => {
				const selectedActivity = userData.selectedActivities.find(
					selected => selected.name === activity.name
				);

				return [ activity.id, selectedActivity!.level ];
			})
		);

		setSelectedActivities(userActivitiesMap);
	}, [ activities, userData.selectedActivities ]);

	const handleSubmit = () => {
		if (selectedActivities.size === 0) {
			onSubmit();
			return;
		}

		const activities = Array.from(selectedActivities.entries())
			.map(([ activityId, level ]) => ({ activityId, level }));

		patchActivities(activities)
			.then(onSubmit)
			.catch(console.error);
	};

	const setActivityLevel = (activityId: number, level: number) => {
		const newSelectedActivities = new Map(selectedActivities);
		newSelectedActivities.set(activityId, level);
		setSelectedActivities(newSelectedActivities);
	};

	const renderActivities = () => {
		return activities.map(activity => {
			const activityLevel = selectedActivities.get(activity.id) || 0;
			return <ActivityItem key={ activity.id }
			                     id={ activity.id }
			                     level={ activityLevel }
			                     name={ activity.name }
			                     info={ activity.info }
			                     onSelect={ setActivityLevel }/>
		});
	};

	return (
		<div className={ styles['activities'] }>
			<div className={ styles['activities__info'] }>
				<InfoIcon width={ 14 } height={ 14 }/>
				<span>Zostaw puste jeśli nie świadczysz usługi</span>
			</div>
			<div className={ styles['activities__content'] }>
				{ renderActivities() }
			</div>
			<button className={ `btn 
								 btn--primary 
								 ${ styles['activities__btn'] }` }
			        onClick={ handleSubmit }>
				Przejdź dalej
			</button>
		</div>
	);
};

export default ActivitiesStep;