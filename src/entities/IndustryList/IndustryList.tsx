import OnboardingSearchBar from "@components/features/onboarding/OnboardingSearchBar/OnboardingSearchBar.tsx";
import React, { useEffect, useState } from "react";
import { IIndustry, ISubIndustry } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import { IIndustryListProps } from "./industryListTypes.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";
import OnboardingCategoryItem from "@ui/onboarding/OnboardingCategoryItem/OnboardingCategoryItem.tsx";

const IndustryList: React.FC<IIndustryListProps> = ({
	                                                    selectedSubIndustries,
	                                                    industries,
	                                                    setSelectedSubIndustries
                                                    }) => {

	const [ filteredSubIndustries, setFilteredSubIndustries ] = useState<ISubIndustry[]>([]);

	useEffect(() => {
		setFilteredSubIndustries(industries.flatMap(industry => industry.subIndustries));
	}, [ industries ]);

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

	const getIsSubIndustryActive = (
		subIndustriesToSearch: ISubIndustry[],
		subIndustry: ISubIndustry
	) => {
		return subIndustriesToSearch.map(item => item.id).includes(subIndustry.id);
	};

	const renderIndustry = (industry: IIndustry) => {

		const content = industry.subIndustries.map(
			subIndustry => {
				const isActive = getIsSubIndustryActive(selectedSubIndustries, subIndustry);
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
				                               getIsSubIndustryActive(selectedSubIndustries, subIndustry)
			                               )
		                               }
		                               categoryContent={ content }/>
	};

	const renderContent = () => {
		return industries
			.filter(industry =>
				industry.subIndustries.length > 0 &&
				industry.subIndustries.some(subIndustry =>
					getIsSubIndustryActive(filteredSubIndustries, subIndustry)
				)
			)
			.map(industry => renderIndustry(industry));
	};

	return (
		<>
			<OnboardingSearchBar onSearch={ onSearch }/>
			{ renderContent() }
		</>
	)
}

export default IndustryList;