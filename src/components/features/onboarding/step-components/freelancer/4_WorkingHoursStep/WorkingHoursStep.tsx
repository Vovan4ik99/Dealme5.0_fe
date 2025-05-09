import styles from './WorkingHoursStep.module.scss';
import React, { useEffect, useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import { IWorkingHour } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";

const WorkingHoursStep: React.FC<IStepComponentProps<IFreelancerData>> = ({ userData, onSubmit }) => {

	const { patchWorkingHours, getWorkingHours } = useFreelancerOnboardingService();

	const [ selectedHour, setSelectedHour ] = useState<IWorkingHour | undefined>();
	const [ workingHours, setWorkingHours ] = useState<IWorkingHour[]>([]);

	useEffect(() => {
		getWorkingHours()
			.then(setWorkingHours)
			.catch(console.error);
	}, [ getWorkingHours ]);

	useEffect(() => {
		if (!userData.workingHours) return;

		const selectedHour = workingHours
			.find(hour => hour.workingHour === userData.workingHours);
		setSelectedHour(selectedHour);
	}, [ userData.workingHours, workingHours ]);

	const renderHours = () => {
		return workingHours.map(hour => {
			const isActive = hour.workingHour === selectedHour?.workingHour;
			return <OnboardingOption key={ hour.workingHour }
			                         title={ hour.description }
			                         titleAddText={ ' / tydzień' }
			                         titleFontSize={ 16 }
			                         isActive={ isActive }
			                         onClick={ () => setSelectedHour(hour) }/>
		});
	};

	const handleSubmit = () => {
		if (!selectedHour) return;

		patchWorkingHours(selectedHour.workingHour)
			.then(onSubmit)
			.catch(console.error);
	};

	return (
		<div className={ styles['hours'] }>
			<div className={ styles['hours__content'] }>
				{ renderHours() }
			</div>
			<button className={ `btn 
								 btn--primary 
								 ${ styles['hours__btn'] }` }
			        disabled={ !selectedHour }
			        onClick={ handleSubmit }>
				Przejdź dalej
			</button>
		</div>
	);
};

export default WorkingHoursStep;