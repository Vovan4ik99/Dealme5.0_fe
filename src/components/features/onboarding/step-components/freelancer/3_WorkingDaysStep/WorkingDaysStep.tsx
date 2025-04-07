import React, { useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import styles from './WorkingDaysStep.module.scss';
import { WorkingDayKey } from "@constants/onboarding/workingDays.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import WorkingDaysList from "@entities/WorkingDaysList/WorkingDaysList.tsx";

const WorkingDaysStep: React.FC<IStepComponentProps<IFreelancerData>> = ({ userData, onSubmit }) => {

	const { patchWorkingDays } = useFreelancerOnboardingService()

	const [ selectedDays, setSelectedDays ] = useState<WorkingDayKey[]>(userData.workingDays || []);

	const handleSubmit = () => {
		if (selectedDays.length === 0) return;

		patchWorkingDays(selectedDays)
			.then(onSubmit)
			.catch(console.error);
	};

	return (
		<div className={ styles['days'] }>
			<div className={ styles['days__content'] }>
				<WorkingDaysList setSelectedDays={ setSelectedDays }
				                 selectedDays={ selectedDays }/>
			</div>
			<button className={ 'btn btn--mt0' }
			        disabled={ selectedDays.length === 0 }
			        onClick={ handleSubmit }>
				Przejdź dalej
			</button>
		</div>
	);
};

export default WorkingDaysStep;