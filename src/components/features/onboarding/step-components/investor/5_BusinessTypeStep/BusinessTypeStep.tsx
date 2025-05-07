import React, { useEffect, useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IInvestorData } from "@shared/investor/common.ts";
import styles from "./BusinessTypeStep.module.scss";
import { useInvestorOnboardingService } from "@services/onboarding/investorOnboardingService.ts";
import { IBusinessType } from "@shared/onboarding/investorOnboardingTypes.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";

const BusinessTypeStep: React.FC<IStepComponentProps<IInvestorData>> = ({ userData, onSubmit }) => {

	const { getBusinessTypes, patchBusinessType } = useInvestorOnboardingService();

	const [ types, setTypes ] = useState<IBusinessType[]>([]);
	const [ selectedType, setSelectedType ] = useState<IBusinessType | undefined>();

	useEffect(() => {
		getBusinessTypes()
			.then(setTypes)
			.catch(console.error);
	}, [ getBusinessTypes ]);

	useEffect(() => {
		if (types.length === 0 || !userData.businessType) return;

		const selectedType = types
			.find(type => type.name === userData.businessType);

		setSelectedType(selectedType);
	}, [ types, userData.businessType ]);

	const renderContent = () => {
		return types.map(type => {
			const isActive = type.name === selectedType?.name;
			return <OnboardingOption key={ type.name }
			                         title={ type.description }
			                         description={ type.target }
			                         isActive={ isActive }
			                         onClick={ () => setSelectedType(type) }/>
		});
	};

	const handleSubmit = () => {
		if (!selectedType) return;

		patchBusinessType(selectedType.name)
			.then(onSubmit)
			.catch(console.error);
	};

	return (
		<div className={ styles['type'] }>
			<div className={ styles['type__content'] }>
				{ renderContent() }
			</div>
			<button className={ styles["type__btn"] }
			        disabled={ !selectedType }
			        onClick={ handleSubmit }>
				Przejdź dalej
			</button>
		</div>
	);
};

export default BusinessTypeStep;