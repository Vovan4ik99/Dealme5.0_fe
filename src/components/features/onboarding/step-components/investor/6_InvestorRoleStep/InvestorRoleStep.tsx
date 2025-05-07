import React, { useEffect, useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IInvestorData } from "@shared/investor/common.ts";
import styles from "./InvestorRoleStep.module.scss";
import { useInvestorOnboardingService } from "@services/onboarding/investorOnboardingService.ts";
import { IInvestorRole } from "@shared/onboarding/investorOnboardingTypes.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";

const InvestorRoleStep: React.FC<IStepComponentProps<IInvestorData>> = ({ userData, onSubmit }) => {

	const { getInvestorRoles, patchInvestorRole } = useInvestorOnboardingService();

	const [ roles, setRoles ] = useState<IInvestorRole[]>([]);
	const [ selectedRole, setSelectedRole ] = useState<IInvestorRole | undefined>();

	useEffect(() => {
		getInvestorRoles()
			.then(setRoles)
			.catch(console.error);
	}, [ getInvestorRoles ]);

	useEffect(() => {
		if (roles.length === 0 || !userData.investorRole) return;

		const selectedRole = roles
			.find(role => role.name === userData.investorRole);
		setSelectedRole(selectedRole);
	}, [ roles, userData.investorRole ]);

	const renderContent = () => {
		return roles.map(role => {
			const isActive = role.name === selectedRole?.name;
			return <OnboardingOption key={ role.name }
			                         title={ role.description }
			                         isActive={ isActive }
			                         withTooltipIcon
			                         onClick={ () => setSelectedRole(role) }/>
		});
	};

	const handleSubmit = () => {
		if (!selectedRole) return;

		patchInvestorRole(selectedRole.name)
			.then(onSubmit)
			.catch(console.error);
	};

	return (
		<div className={ styles['role'] }>
			<div className={ styles['role__content'] }>
				{ renderContent() }
			</div>
			<button className={ styles['role__btn'] }
			        disabled={ !selectedRole }
			        onClick={ handleSubmit }>
				Przejdź dalej
			</button>
		</div>
	);
};

export default InvestorRoleStep;