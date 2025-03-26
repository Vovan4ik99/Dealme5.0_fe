import React, { useState } from "react";
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";
import InputError from "@ui/InputError/InputError.tsx";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import { WorkingDayKey } from "@constants/workingDays.ts";
import { IWorkingDayProps } from "./workingDayStepTypes.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import WorkingDaysList from "@entities/WorkingDaysList/WorkingDaysList.tsx";

const WorkingDaysStep: React.FC<IWorkingDayProps> = ({ onNext, userWorkingDays }) => {

	const { loadingStatus, errorMessage, patchWorkingDays } = useFreelancerOnboardingService();

	const [ selectedDays, setSelectedDays ] = useState<WorkingDayKey[]>(userWorkingDays);

	const onChange = (newDay: WorkingDayKey) => {
		setSelectedDays((prevState) => {
			return prevState.includes(newDay)
				? prevState.filter(day => day !== newDay)
				: [ ...prevState, newDay ];
		})
	};

	const onSubmit = () => {
		if (selectedDays.length > 0) {
			patchWorkingDays(selectedDays).then(() => {
				onNext();
			}).catch(e => console.log(e));
		}
	};

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<AnimatedStep>
			<h1 className={ 'title title--fs40' }>W jakie dni jesteś dostępny?</h1>
			<WorkingDaysList selectedWorkingDays={ selectedDays } onChange={ onChange }/>
			<button disabled={ selectedDays.length === 0 }
			        onClick={ () => onSubmit() }
			        className={ 'btn' }>Przejdż dalej
			</button>
			{ errorMessage && <InputError text={ errorMessage }/> }
		</AnimatedStep>
	);
}

export default WorkingDaysStep;