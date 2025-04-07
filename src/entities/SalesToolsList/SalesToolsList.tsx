import React, { useState } from "react";
import { ISalesToolsListProps } from "@entities/SalesToolsList/salesToolsListTypes.ts";
import OnboardingSearchBar from "@components/features/onboarding/OnboardingSearchBar/OnboardingSearchBar.tsx";
import { getToolKindNameByKind } from "@utils/salesToolsUtils.ts";
import { ISalesTool } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";
import { getPictureForSalesTools } from "@utils/onboardingUtils.ts";
import OnboardingCategoryItem from "@ui/onboarding/OnboardingCategoryItem/OnboardingCategoryItem.tsx";

const SalesToolsList: React.FC<ISalesToolsListProps> = ({ tools, selectedTools, setSelectedTools }) => {

	const [ filteredTools, setFilteredTools ] = useState<ISalesTool[]>(tools);

	const handleToolClick = (tool: ISalesTool) => {
		setSelectedTools(prevState => {
			if (prevState.map(tool => tool.id).includes(tool.id)) {
				return prevState.filter(item => item.id !== tool.id);
			}
			return [ ...prevState, tool ];
		});
	};

	const renderContent = () => {

		const uniqueCategories = Array.from(
			new Set(filteredTools.map(tool => tool.kind))
		);

		return uniqueCategories.map(category => {
				const toolsInCategory = filteredTools
					.filter(tool => tool.kind === category);

				const categoryContent = toolsInCategory.map(tool => {
					const isActive = selectedTools.map(item => item.id).includes(tool.id);
					return <OnboardingOption key={ tool.id }
					                         title={ tool.toolName }
					                         titleFontSize={ 16 }
					                         isActive={ isActive }
					                         withCheckboxInput
					                         image={ getPictureForSalesTools(tool.toolName) }
					                         onClick={ () => handleToolClick(tool) }/>
				});

				const isActive = categoryContent.some(content => content.props.isActive);

				return <OnboardingCategoryItem key={ category }
				                               text={ getToolKindNameByKind(category) }
				                               isActive={ isActive }
				                               categoryContent={ categoryContent }/>
			}
		);
	};

	const onSearch = (searchStr: string) => {
		if (searchStr.length === 0) {
			setFilteredTools(tools);
			return;
		}

		const filtered = tools
			.filter(item => item.toolName.toLowerCase().includes(searchStr.toLowerCase()));

		setFilteredTools(filtered);
	};

	return (
		<>
			<OnboardingSearchBar onSearch={ onSearch }/>
			{ renderContent() }
		</>
	)
}

export default SalesToolsList;