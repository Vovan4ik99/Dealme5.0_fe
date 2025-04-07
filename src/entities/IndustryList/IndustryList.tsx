import OnboardingSearchBar from "@components/features/onboarding/OnboardingSearchBar/OnboardingSearchBar.tsx";
import React, { useState } from "react";
import { ISubIndustry } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import { IIndustryListProps } from "./industryListTypes.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";
import OnboardingCategoryItem from "@ui/onboarding/OnboardingCategoryItem/OnboardingCategoryItem.tsx";

const IndustryList: React.FC<IIndustryListProps> = ({
	                                                    selectedSubIndustries,
	                                                    industries,
	                                                    setSelectedSubIndustries
                                                    }) => {

	const [ filteredSubIndustries, setFilteredSubIndustries ] = useState<ISubIndustry[]>(
		industries.flatMap(industry => industry.subIndustries)
	);

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

	return (
		<>
			<OnboardingSearchBar onSearch={ onSearch }/>
			{ renderContent() }
		</>
	)
}

export default IndustryList;