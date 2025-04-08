import React, { useCallback, useEffect, useState } from "react";
import { IWorkingHoursModalItemProps } from "./workingHoursModalItemTypes.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";
import { IWorkingHour } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import styles from "./WorkingHoursModalItem.module.scss";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";

const WorkingHoursModalItem: React.FC<IWorkingHoursModalItemProps> = ({ userWorkingHour, onSave, registerOnSave }) => {

	const { loadingStatus, getWorkingHours } = useFreelancerOnboardingService();

	const [ workingHours, setWorkingHours ] = useState<IWorkingHour[]>([]);
	const [ selectedWorkingHour, setSelectedWorkingHour ] = useState<IWorkingHour | undefined>();

	useEffect(() => {
		getWorkingHours()
			.then(setWorkingHours)
			.catch(console.error);
	}, [ getWorkingHours ]);

	useEffect(() => {
		if (!userWorkingHour) return;

		const selectedHour = workingHours
			.find(hour => hour.workingHour === userWorkingHour);
		setSelectedWorkingHour(selectedHour);
	}, [ userWorkingHour, workingHours ]);

	const handleSave = useCallback(() => {
		if (selectedWorkingHour) {
			onSave(selectedWorkingHour.workingHour);
		}
	}, [ onSave, selectedWorkingHour ]);

	const renderHours = () => {
		return workingHours.map(hour => {
			const isActive = hour.workingHour === selectedWorkingHour?.workingHour;
			return <OnboardingOption key={ hour.workingHour }
			                         title={ hour.description }
			                         titleAddText={ ' / tydzień' }
			                         titleFontSize={ 16 }
			                         isActive={ isActive }
			                         onClick={ () => setSelectedWorkingHour(hour) }/>
		});
	};

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, onSave, registerOnSave ]);

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<div className={ styles['items'] }>
			{ renderHours() }
		</div>
	);
};

export default WorkingHoursModalItem;