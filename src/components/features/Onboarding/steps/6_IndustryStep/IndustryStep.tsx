import React, {useEffect, useState} from "react";
import {IIndustry, ISubIndustry} from "@shared/onboardingTypes.ts";
import {useOnboardingService} from "@services/onboardingService.ts";
import styles from "../../Onboarding.module.scss";
import InputError from "@ui/InputError/InputError.tsx";
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";
import OnboardingSearchBar from "../../items/OnboardingSearchBar/OnboardingSearchBar.tsx";
import IndustryItem from "../../items/IndustryItem/IndustryItem.tsx";
import {IIndustryStepProps} from "./industryStepTypes.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";

const IndustryStep: React.FC<IIndustryStepProps> = ({onNext, userSubIndustries}) => {

	const [industries, setIndustries] = useState<IIndustry[]>([]);
	const [selectedSubIndustries, setSelectedSubIndustries] = useState<number[]>([]);
	const [filteredSubIndustries, setFilteredSubIndustries] = useState<ISubIndustry[] | null>(null);

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
	}

	const onSearch = (searchStr: string) => {
		if (searchStr === '') {
			return setFilteredSubIndustries(null);
		}
		const subIndustries = industries.flatMap(industry => industry.subIndustries);
		setFilteredSubIndustries(() => subIndustries.filter(item => {
			return item.name.toLowerCase().includes(searchStr.toLowerCase());
		}));
	}

	const onSubmit = () => {
		if (selectedSubIndustries.length > 0) {
			patchSubIndustries(selectedSubIndustries)
				.then(() => onNext())
				.catch(e => console.error(e));
		}
	}

	const isIndustryInSearchRange = (industry: IIndustry) => {
		if (filteredSubIndustries === null) {
			return false;
		}
		return filteredSubIndustries.some(subIndustry => industry.subIndustries.includes(subIndustry));
	}

	const getFilteredSubIndustries = (industry: IIndustry) => {
		if (filteredSubIndustries === null) {
			return industry.subIndustries;
		}
		return industry.subIndustries.filter(subIndustry => filteredSubIndustries.includes(subIndustry));
	}

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<AnimatedStep>
			<h1 className={'title title--fs40'}>Z produktami/usługami jakiej branży pracowałeś?</h1>
			<div className={styles['onboarding-step__categories']}>
				<OnboardingSearchBar onSearch={onSearch}/>
				{loadingStatus === 'idle' && industries.map(industry => {
					return <IndustryItem key={industry.id}
					                     text={industry.name}
					                     subIndustries={getFilteredSubIndustries(industry)}
					                     selectedSubIndustries={selectedSubIndustries}
					                     onChange={onChange}
					                     isSearchActive={filteredSubIndustries !== null}
					                     isInSearchRange={isIndustryInSearchRange(industry)}
					/>
				})}
			</div>
			<button disabled={selectedSubIndustries.length === 0}
			        onClick={() => onSubmit()}
			        className={'btn'}>Przejdż dalej
			</button>
			{errorMessage && <InputError text={errorMessage}/>}
		</AnimatedStep>
	)
}

export default IndustryStep;