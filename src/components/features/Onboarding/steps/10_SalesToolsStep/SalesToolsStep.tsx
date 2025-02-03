import React, {useEffect, useState} from "react";
import {ISalesToolsStepProps} from "./salesToolsTypes.ts";
import {useOnboardingService} from "@services/onboardingService.ts";
import {ISalesTool} from "@shared/onboardingTypes.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import InputError from "@ui/InputError/InputError.tsx";
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";
import SalesToolsList from "@entities/SalesToolsList/SalesToolsList.tsx";

const SalesToolsStep: React.FC<ISalesToolsStepProps> = ({userTools, onNext}) => {

	const [salesTools, setSalesTools] = useState<ISalesTool[]>([]);
	const [selectedSalesTools, setSelectedSalesTools] = useState<number[]>([]);

	const {errorMessage, loadingStatus, getSalesTools, patchSalesTools} = useOnboardingService();

	useEffect(() => {
		getSalesTools()
			.then(setSalesTools)
			.catch(console.error);
	}, [getSalesTools]);

	useEffect(() => {
		setSelectedSalesTools(userTools.map(tool => tool.id));
	}, [userTools]);

	const onChange = (newSalesTool: number) => {
		setSelectedSalesTools(prevState => {
			return prevState?.includes(newSalesTool)
				? prevState?.filter(item => item !== newSalesTool)
				: [...prevState, newSalesTool];
		});
	};

	const onSubmit = () => {
		if (selectedSalesTools.length > 0) {
			patchSalesTools(selectedSalesTools)
				.then(() => onNext())
				.catch(e => console.error(e));
		}
	};

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<AnimatedStep>
			<h1 className={'title title--fs40'}>Z jakich narzedzi sprzedażowych korzystałeś?</h1>
			<SalesToolsList tools={salesTools}
			                selectedTools={selectedSalesTools}
			                onChange={onChange}/>
			<button disabled={selectedSalesTools.length === 0}
			        onClick={() => onSubmit()}
			        className={'btn'}>Przejdż dalej
			</button>
			{errorMessage && <InputError text={errorMessage}/>}
		</AnimatedStep>
	);
}

export default SalesToolsStep;