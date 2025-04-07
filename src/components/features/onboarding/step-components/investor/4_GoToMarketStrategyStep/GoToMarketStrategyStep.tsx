import React, { useEffect, useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IInvestorData } from "@shared/investor/common.ts";
import styles from "./GoToMarketStrategyStep.module.scss";
import { useInvestorOnboardingService } from "@services/onboarding/investorOnboardingService.ts";
import { IGoToMarketStrategy } from "@shared/onboarding/investorOnboardingTypes.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";

const GoToMarketStrategyStep: React.FC<IStepComponentProps<IInvestorData>> = ({ userData, onSubmit }) => {

	const { patchGoToMarketStrategy, getGoToMarketStrategies } = useInvestorOnboardingService();

	const [ strategies, setStrategies ] = useState<IGoToMarketStrategy[]>([]);
	const [ selectedStrategy, setSelectedStrategy ] = useState<IGoToMarketStrategy | undefined>();

	useEffect(() => {
		getGoToMarketStrategies()
			.then(setStrategies)
			.catch(console.error);
	}, [ getGoToMarketStrategies ]);

	useEffect(() => {
		if (!userData.goToMarketStrategy) return;

		const selectedStrategy = strategies
			.find(strategy => strategy.name === userData.goToMarketStrategy);
		setSelectedStrategy(selectedStrategy);
	}, [ strategies, userData.goToMarketStrategy ]);

	const renderContent = () => {
		return strategies.map(strategy => {
			const isActive = strategy.name === selectedStrategy?.name;
			return <OnboardingOption key={ strategy.name }
			                         title={ strategy.description }
			                         description={ strategy.target }
			                         isActive={ isActive }
			                         onClick={ () => setSelectedStrategy(strategy) }/>
		});
	};

	const handleSubmit = () => {
		if (!selectedStrategy) return;
		patchGoToMarketStrategy(selectedStrategy.name)
			.then(onSubmit)
			.catch(console.error);
	};

	return (
		<div className={ styles['strategy'] }>
			<div className={ styles['strategy__content'] }>
				{ renderContent() }
			</div>
			<button className={ 'btn btn--mt0' }
			        disabled={ !selectedStrategy }
			        onClick={ handleSubmit }>
				Przejdź dalej
			</button>
		</div>
	);
}

export default GoToMarketStrategyStep;