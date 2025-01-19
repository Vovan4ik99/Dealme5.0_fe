import React, {useEffect, useState} from "react";
import {IIndustry} from "@shared/onboardingTypes.ts";
import {useOnboardingService} from "@services/onboardingService.ts";
import InputError from "@ui/InputError/InputError.tsx";
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";
import {IIndustryStepProps} from "./industryStepTypes.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import IndustryList from "@entities/IndustryList/IndustryList.tsx";

const IndustryStep: React.FC<IIndustryStepProps> = ({onNext, userSubIndustries}) => {

	const [industries, setIndustries] = useState<IIndustry[]>([]);
	const [selectedSubIndustries, setSelectedSubIndustries] = useState<number[]>([]);

	const {loadingStatus, errorMessage, getIndustries, patchSubIndustries} = useOnboardingService();

	useEffect(() => {
		if (userSubIndustries.length > 0) {
			setSelectedSubIndustries(userSubIndustries.map(subIndustry => subIndustry.id));
		}
	}, [userSubIndustries]);
	
	useEffect(() => {
		getIndustries()
			.then((response) => setIndustries(response))
			.catch((error) => console.log(error));
	}, [getIndustries]);

	const onChange = (newSubIndustry: number) => {
		setSelectedSubIndustries(prevState => {
			return prevState?.includes(newSubIndustry)
				? prevState?.filter(item => item !== newSubIndustry)
				: [...prevState, newSubIndustry];
		});
	};


	const onSubmit = () => {
		if (selectedSubIndustries.length > 0) {
			patchSubIndustries(selectedSubIndustries)
				.then(() => onNext())
				.catch(e => console.error(e));
		}
	}

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<AnimatedStep>
			<h1 className={'title title--fs40'}>Z produktami/usługami jakiej branży pracowałeś?</h1>
			<IndustryList industries={industries} selectedSubIndustries={selectedSubIndustries} onChange={onChange}/>
			<button disabled={selectedSubIndustries.length === 0}
			        onClick={() => onSubmit()}
			        className={'btn'}>Przejdż dalej
			</button>
			{errorMessage && <InputError text={errorMessage}/>}
		</AnimatedStep>
	)
}

export default IndustryStep;