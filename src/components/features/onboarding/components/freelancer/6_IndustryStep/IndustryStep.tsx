import React, { useEffect, useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import styles from './IndustryStep.module.scss';
import OnboardingSearchBar from "@components/features/onboarding/OnboardingSearchBar/OnboardingSearchBar.tsx";
import { IIndustry, ISubIndustry } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import OnboardingCategoryItem from "@ui/onboarding/OnboardingCategoryItem/OnboardingCategoryItem.tsx";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";

const IndustryStep: React.FC<IStepComponentProps<IFreelancerData>> = ({ userData, onSubmit }) => {

	const { getIndustries, patchSubIndustries } = useFreelancerOnboardingService();

	const [ industries, setIndustries ] = useState<IIndustry[]>([]);
	const [ selectedSubIndustries, setSelectedSubIndustries ] = useState<ISubIndustry[]>(userData.subIndustries);
	const [ filteredSubIndustries, setFilteredSubIndustries ] = useState<ISubIndustry[]>([]);

	useEffect(() => {
		getIndustries()
			.then(response => {
				setIndustries(response);
				setFilteredSubIndustries(
					response.map(industry => industry.subIndustries).flat()
				);
			})
			.catch(console.error);
	}, [ getIndustries ]);

	const onSearch = (searchStr: string) => {
		const allSubIndustries = industries.flatMap(industry => industry.subIndustries);

		if (searchStr.length === 0) {
			setFilteredSubIndustries(allSubIndustries);
			return;
		}

		const filtered = allSubIndustries.filter(item =>
			item.name.toLowerCase().includes(searchStr.toLowerCase())
		);

		setFilteredSubIndustries(filtered);
	};

	const handleSubIndustryClick = (subIndustry: ISubIndustry) => {
		setSelectedSubIndustries(prev => {
			if (prev.map(subIndustry => subIndustry.id).includes(subIndustry.id)) {
				return prev.filter(item => item.id !== subIndustry.id);
			}
			return [ ...prev, subIndustry ];
		});
	};

	const renderContent = () => {

		const getIsSubIndustryActive = (subIndustry: ISubIndustry) => {
			return selectedSubIndustries.map(item => item.id).includes(subIndustry.id);
		};

		return industries
			.filter(industry =>
				industry.subIndustries.length > 0 &&
				industry.subIndustries.some(subIndustry =>
					filteredSubIndustries
						.map(filteredSubIndustry => filteredSubIndustry.id)
						.includes(subIndustry.id)
				)
			)
			.map(industry => {
				const content = industry.subIndustries.map(
					subIndustry => {
						const isActive = getIsSubIndustryActive((subIndustry));
						return <OnboardingOption key={ subIndustry.id }
						                         title={ subIndustry.name }
						                         withTooltipIcon={ true }
						                         tooltipText={ subIndustry.info }
						                         onClick={ () => handleSubIndustryClick(subIndustry) }
						                         titleFontSize={ 16 }
						                         withCheckboxInput
						                         isActive={ isActive }/>
					});
				return <OnboardingCategoryItem key={ industry.id }
				                               text={ industry.name }
				                               isActive={
					                               industry.subIndustries.some(subIndustry =>
						                               getIsSubIndustryActive((subIndustry))
					                               )
				                               }
				                               categoryContent={ content }/>
			});
	};

	const handleSubmit = () => {
		if (selectedSubIndustries.length === 0) return;

		patchSubIndustries(selectedSubIndustries.map(subIndustry => subIndustry.id))
			.then(onSubmit)
			.catch(console.error);
	};

	return (
		<div className={ styles['industry'] }>
			<OnboardingSearchBar onSearch={ onSearch }/>
			{ renderContent() }
			<button className={ 'btn btn--mt0' }
			        onClick={ handleSubmit }
			        disabled={ selectedSubIndustries.length === 0 }>
				Przejdź dalej
			</button>
		</div>
	);
};

export default IndustryStep;