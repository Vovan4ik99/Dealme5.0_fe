import React, { useCallback, useEffect, useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IActivityDestiny } from "@shared/onboarding/investorOnboardingTypes.ts";
import { useInvestorOnboardingService } from "@services/onboarding/investorOnboardingService.ts";
import styles from "./ActivityDestinyStep.module.scss";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";
import { IInvestorData } from "@shared/investor/common.ts";

const ActivityDestinyStep: React.FC<IStepComponentProps<IInvestorData>> = ({ onSubmit, userData }) => {

	const { getActivities, patchActivity } = useInvestorOnboardingService();

	const [ activities, setActivities ] = useState<IActivityDestiny[]>([]);
	const [ selectedActivity, setSelectedActivity ] = useState<IActivityDestiny | undefined>();

	useEffect(() => {
		getActivities()
			.then(setActivities)
			.catch(console.error);
	}, [ getActivities ]);

	useEffect(() => {
		if (activities.length === 0 || !userData.activityDestiny) return;

		const selectedActivity = activities
			.find(activity => activity.name === userData.activityDestiny);

		setSelectedActivity(selectedActivity);
	}, [ activities, userData.activityDestiny ]);

	const handleSubmit = useCallback(() => {
		if (!selectedActivity) return;

		patchActivity(selectedActivity.name)
			.then(onSubmit)
			.catch(console.error);
	}, [ onSubmit, patchActivity, selectedActivity ]);

	const renderContent = () => {
		return activities.map(activity => {
			const isActive = activity.name === selectedActivity?.name;
			return <OnboardingOption key={ activity.name }
			                         title={ activity.target }
			                         description={ activity.description }
			                         onClick={ () => setSelectedActivity(activity) }
			                         isActive={ isActive }/>
		});
	};

	return (
		<div className={ styles['activities'] }>
			<div className={ styles['activities__content'] }>
				{ renderContent() }
			</div>
			<button className={ 'btn btn--mt0' }
			        disabled={ !selectedActivity }
			        onClick={ handleSubmit }>
				Przejdź dalej
			</button>
		</div>
	);
};

export default ActivityDestinyStep;