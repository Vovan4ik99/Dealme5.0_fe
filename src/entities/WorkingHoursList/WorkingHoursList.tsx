import WorkingHourItem from "@components/features/Onboarding/items/WorkingHourItem/WorkingHourItem.tsx";
import React, { useEffect, useState } from "react";
import { IWorkingHour } from "@shared/onboardingTypes.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import { IWorkingHoursListProps } from "@entities/WorkingHoursList/workingHoursListTypes.ts";
import styles from "../Entity.module.scss";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";

const WorkingHoursList: React.FC<IWorkingHoursListProps> = ({ selectedHour, onChange }) => {

	const { loadingStatus, getWorkingHours } = useFreelancerOnboardingService();
	
	const [ workingHours, setWorkingHours ] = useState<IWorkingHour[]>([]);

	useEffect(() => {
		getWorkingHours()
			.then(response => setWorkingHours(response))
			.catch(e => console.error(e));
	}, [ getWorkingHours ]);

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<div className={ styles['item'] }>
			{ workingHours.map(hour => {
				const isSelected = selectedHour === hour.workingHour;
				return <WorkingHourItem key={ hour.workingHour }
				                        text={ hour.description }
				                        isSelected={ isSelected }
				                        onChange={ () => onChange(hour.workingHour) }/>
			}) }
		</div>
	);
}

export default WorkingHoursList;