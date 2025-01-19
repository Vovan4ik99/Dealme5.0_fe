import React, {useState} from "react";
import InputError from "@ui/InputError/InputError.tsx";
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";
import {useOnboardingService} from "@services/onboardingService.ts";
import {IWorkingHoursStepProps} from "./workingHoursStepTypes.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import WorkingHoursList from "@entities/WorkingHoursList/WorkingHoursList.tsx";

const WorkingHoursStep: React.FC<IWorkingHoursStepProps> = ({onNext, userWorkingHours}) => {

	const [selectedHour, setSelectedHour] = useState<string | null>(userWorkingHours);
	const {loadingStatus, errorMessage, patchWorkingHours} = useOnboardingService();

	const onSubmit = () => {
		if (selectedHour) {
			patchWorkingHours(selectedHour)
				.then(() => onNext())
				.catch(e => console.error(e));
		}
	}

	const onChange = (newHour: string) => {
		setSelectedHour(newHour);
	}

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<AnimatedStep>
			<h1 className={'title title--fs40'}>Ile godzin w tygodniu jesteś w stanie poświecić na Dealme?</h1>
			<WorkingHoursList selectedHour={selectedHour} onChange={onChange}/>
			<button disabled={selectedHour === null}
			        onClick={() => onSubmit()}
			        className={'btn'}>Przejdż dalej
			</button>
			{errorMessage && <InputError text={errorMessage}/>}
		</AnimatedStep>
	)
}

export default WorkingHoursStep;