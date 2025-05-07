import React, { useCallback, useEffect, useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import styles from "./OrganizationStageStep.module.scss";
import { useInvestorOnboardingService } from "@services/onboarding/investorOnboardingService.ts";
import { IOrganizationStage } from "@shared/onboarding/investorOnboardingTypes.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";
import { IInvestorData } from "@shared/investor/common.ts";

const OrganizationStageStep: React.FC<IStepComponentProps<IInvestorData>> = ({ userData, onSubmit }) => {

	const { getOrganizationStages, patchOrganizationStage } = useInvestorOnboardingService();

	const [ selectedStage, setSelectedStage ] = useState<IOrganizationStage | undefined>();
	const [ stages, setStages ] = useState<IOrganizationStage[]>([]);

	useEffect(() => {
		getOrganizationStages()
			.then(setStages)
			.catch(console.error);
	}, [ getOrganizationStages ]);

	useEffect(() => {
		if (stages.length === 0 || !userData.organizationStage) return;

		const selectedStage = stages
			.find(stage => stage.name === userData.organizationStage);

		setSelectedStage(selectedStage);
	}, [ stages, userData.organizationStage ]);

	const handleSubmit = useCallback(() => {
		if (!selectedStage) return;

		patchOrganizationStage(selectedStage.name)
			.then(onSubmit)
			.catch(console.error);
	}, [ onSubmit, patchOrganizationStage, selectedStage ]);

	const renderContent = () => {
		return stages.map(stage => {
			const isActive = stage.name === selectedStage?.name;
			return <OnboardingOption key={ stage.name }
			                         title={ stage.target }
			                         description={ stage.description }
			                         isActive={ isActive }
			                         onClick={ () => setSelectedStage(stage) }/>
		});
	};

	return (
		<div className={ styles['stage'] }>
			<div className={ styles['stage__content'] }>
				{ renderContent() }
			</div>
			<button className={ styles['stage__btn'] }
			        disabled={ !selectedStage }
			        onClick={ handleSubmit }>
				Przejdź dalej
			</button>
		</div>
	);
};

export default OrganizationStageStep;