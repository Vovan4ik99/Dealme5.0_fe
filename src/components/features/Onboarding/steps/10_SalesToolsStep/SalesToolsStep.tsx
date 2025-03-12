import React, {useCallback, useEffect, useState} from "react";
import { ISalesToolsStepProps } from "./salesToolsTypes.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import { ISalesTool } from "@shared/onboardingTypes.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import InputError from "@ui/InputError/InputError.tsx";
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";
import SalesToolsList from "@entities/SalesToolsList/SalesToolsList.tsx";

const SalesToolsStep: React.FC<ISalesToolsStepProps> = ({ onNext }) => {
	const { errorMessage, loadingStatus, getSalesTools, patchSalesTools, updateOnboardingStatus } = useFreelancerOnboardingService();

	const [ salesTools, setSalesTools ] = useState<ISalesTool[]>([]);
	const [ selectedSalesTools, setSelectedSalesTools ] = useState<number[]>([]);

	useEffect(() => {
		getSalesTools()
			.then(setSalesTools)
			.catch(console.error);
	}, [ getSalesTools ]);

	const onChange = (newSalesTool: number) => {
		setSelectedSalesTools(prevState => {
			return prevState?.includes(newSalesTool)
				? prevState?.filter(item => item !== newSalesTool)
				: [ ...prevState, newSalesTool ];
		});
	};

	const onSubmit = () => {
		if (selectedSalesTools.length > 0) {
			patchSalesTools(selectedSalesTools)
				.then(handleOnboardingPass)
				.catch(e => console.error(e));
		}
	};

	const handleOnboardingPass = useCallback(() => {
		updateOnboardingStatus()
			.then(onNext)
			.catch(console.error);
	}, [ updateOnboardingStatus ]);

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<AnimatedStep>
			<h1 className={ 'title title--fs40' }>Z jakich narzedzi sprzedażowych korzystałeś?</h1>
			<SalesToolsList tools={ salesTools }
			                selectedTools={ selectedSalesTools }
			                onChange={ onChange }/>
			<button disabled={ selectedSalesTools.length === 0 }
			        onClick={ () => onSubmit() }
			        className={ 'btn' }>Przejdż dalej
			</button>
			{ errorMessage && <InputError text={ errorMessage }/> }
		</AnimatedStep>
	);
}

export default SalesToolsStep;