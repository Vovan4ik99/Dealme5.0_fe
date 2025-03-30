import React, { useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import styles from './WorkingDaysStep.module.scss';
import { WORKING_DAYS, WorkingDayKey } from "@constants/onboarding/workingDays.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";

const WorkingDaysStep: React.FC<IStepComponentProps<IFreelancerData>> = ({ userData, onSubmit }) => {

	const { patchWorkingDays } = useFreelancerOnboardingService()

	const [ selectedDays, setSelectedDays ] = useState<WorkingDayKey[]>(userData.workingDays || []);

	const selectDay = (day: WorkingDayKey) => {
		if (selectedDays.includes(day)) {
			setSelectedDays(selectedDays.filter(d => d !== day));
		} else {
			setSelectedDays([ ...selectedDays, day ]);
		}
	};

	const renderDays = () => {
		return Object.entries(WORKING_DAYS).map(([ key, entry ]) => {
			const isActive = selectedDays.includes(key as WorkingDayKey);
			return (
				<OnboardingOption key={ key }
				                  title={ entry }
				                  onClick={ () => selectDay(key as WorkingDayKey) }
				                  withCheckboxInput
				                  titleFontSize={ 16 }
				                  isActive={ isActive }/>
			);
		});
	};

	const handleSubmit = () => {
		if (selectedDays.length === 0) return;

		patchWorkingDays(selectedDays)
			.then(onSubmit)
			.catch(console.error);
	};

	return (
		<div className={ styles['days'] }>
			<div className={ styles['days__content'] }>
				{ renderDays() }
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