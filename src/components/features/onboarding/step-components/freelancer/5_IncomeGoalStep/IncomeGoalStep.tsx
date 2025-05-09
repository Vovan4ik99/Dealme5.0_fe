import styles from './IncomeGoalStep.module.scss';
import React, { useEffect, useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import { IIncomeGoal } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";

const IncomeGoalStep: React.FC<IStepComponentProps<IFreelancerData>> = ({ userData, onSubmit }) => {

	const { getIncomeGoals, patchIncomeGoal } = useFreelancerOnboardingService();

	const [ incomeGoals, setIncomeGoals ] = useState<IIncomeGoal[]>([]);
	const [ selectedGoal, setSelectedGoal ] = useState<IIncomeGoal | undefined>();

	useEffect(() => {
		getIncomeGoals()
			.then(setIncomeGoals)
			.catch(console.error);
	}, [ getIncomeGoals ]);

	useEffect(() => {
		if (!userData.incomeGoal) return;

		const selectedGoal = incomeGoals
			.find(goal => goal.incomeGoal === userData.incomeGoal);
		setSelectedGoal(selectedGoal);
	}, [ incomeGoals, userData.incomeGoal ]);

	const renderGoals = () => {
		return incomeGoals.map(goal => {
			const isActive = goal.incomeGoal === selectedGoal?.incomeGoal;
			return <OnboardingOption key={ goal.incomeGoal }
			                         title={ goal.range }
			                         description={ goal.description }
			                         isActive={ isActive }
			                         onClick={ () => setSelectedGoal(goal) }
			                         titleAddTextFontSize={ 16 }
			                         titleAddText={ ' / tydzień' }/>
		});
	};

	const handleSubmit = () => {
		if (!selectedGoal) return;

		patchIncomeGoal(selectedGoal.incomeGoal)
			.then(onSubmit)
			.catch(console.error);
	};

	return (
		<div className={ styles['goal'] }>
			<div className={ styles['goal__content'] }>
				{ renderGoals() }
			</div>
			<button className={ `btn 
								 btn--primary 
								 ${ styles['goal__btn'] }` }
			        disabled={ !selectedGoal }
			        onClick={ handleSubmit }>
				Przejdź dalej
			</button>
		</div>
	);
};

export default IncomeGoalStep;