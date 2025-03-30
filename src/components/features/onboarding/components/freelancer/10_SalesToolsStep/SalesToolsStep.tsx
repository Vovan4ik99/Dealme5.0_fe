import React, { useContext, useEffect, useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import styles from "./SalesToolsStep.module.scss";
import { ISalesTool } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import OnboardingSearchBar from "@components/features/onboarding/OnboardingSearchBar/OnboardingSearchBar.tsx";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";
import OnboardingCategoryItem from "@ui/onboarding/OnboardingCategoryItem/OnboardingCategoryItem.tsx";
import { getPictureForSalesTools, getToolKindNameByKind } from "@utils/onboardingUtils.ts";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";

const SalesToolsStep: React.FC<IStepComponentProps<IFreelancerData>> = ({ userData, onSubmit }) => {

	const { getSalesTools, patchSalesTools, updateOnboardingStatus } = useFreelancerOnboardingService();
	const { getLoggedUserData } = useContext(AuthContext);

	const [ tools, setTools ] = useState<ISalesTool[]>([]);
	const [ selectedTools, setSelectedTools ] = useState<ISalesTool[]>(userData.salesTools);
	const [ filteredTools, setFilteredTools ] = useState<ISalesTool[]>([]);

	useEffect(() => {
		getSalesTools()
			.then(response => {
				setTools(response);
				setFilteredTools(response);
			})
			.catch(console.error);
	}, [ getSalesTools ]);

	const onSearch = (searchStr: string) => {
		if (searchStr.length === 0) {
			setFilteredTools(tools);
			return;
		}

		const filtered = tools
			.filter(item => item.toolName.toLowerCase().includes(searchStr.toLowerCase()));

		setFilteredTools(filtered);
	};

	const handleSubmit = () => {
		if (selectedTools.length === 0) return;

		patchSalesTools(selectedTools.map(tool => tool.id))
			.then(updateOnboardingStatus)
			.then(() => getLoggedUserData(localStorage.getItem('token')!))
			.then(onSubmit)
			.catch(console.error);
	};

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

	return (
		<div className={ styles['tools'] }>
			<OnboardingSearchBar onSearch={ onSearch }/>
			{ renderContent() }
			<button className={ 'btn btn--mt0' }
			        disabled={ selectedTools.length === 0 }
			        onClick={ handleSubmit }>
				Zakończ i przejdź do panelu
			</button>
		</div>
	);
};

export default SalesToolsStep;