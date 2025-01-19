import OnboardingSearchBar
	from "@components/features/Onboarding/items/OnboardingSearchBar/OnboardingSearchBar.tsx";
import IndustryItem from "@components/features/Onboarding/items/IndustryItem/IndustryItem.tsx";
import React, {useState} from "react";
import {IIndustry, ISubIndustry} from "@shared/onboardingTypes.ts";
import {IIndustryListProps} from "./industryListTypes.ts";
import styles from './IndustryList.module.scss';

const IndustryList: React.FC<IIndustryListProps> = ({selectedSubIndustries, industries, onChange}) => {
	const [filteredSubIndustries, setFilteredSubIndustries] = useState<ISubIndustry[] | null>(null);

	const onSearch = (searchStr: string) => {
		if (searchStr === '') {
			return setFilteredSubIndustries(null);
		}
		const subIndustries = industries.flatMap(industry => industry.subIndustries);
		setFilteredSubIndustries(() => subIndustries.filter(item => {
			return item.name.toLowerCase().includes(searchStr.toLowerCase());
		}));
	};

	const isIndustryInSearchRange = (industry: IIndustry) => {
		if (filteredSubIndustries === null) {
			return false;
		}
		return filteredSubIndustries.some(subIndustry => industry.subIndustries.includes(subIndustry));
	};

	const getFilteredSubIndustries = (industry: IIndustry) => {
		if (filteredSubIndustries === null) {
			return industry.subIndustries;
		}
		return industry.subIndustries.filter(subIndustry => filteredSubIndustries.includes(subIndustry));
	};

	return (
		<div className={styles['list']}>
			<OnboardingSearchBar onSearch={onSearch}/>
			{industries.map(industry => {
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
	)
}

export default IndustryList;