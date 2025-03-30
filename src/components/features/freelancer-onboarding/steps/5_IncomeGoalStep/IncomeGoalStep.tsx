import React, { useEffect, useState } from "react";
import { IIncomeGoalStepProps } from "./incomeGoalStepTypes.ts";
import { IIncomeGoal } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";
import styles from "../../Onboarding.module.scss";
import InputError from "@ui/InputError/InputError.tsx";
import IncomeGoalItem from "@components/features/freelancer-onboarding/items/IncomeGoalItem/IncomeGoalitem.tsx";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";

const IncomeGoalStep: React.FC<IIncomeGoalStepProps> = ({ onNext, userGoal }) => {

	const [ incomeGoals, setIncomeGoals ] = useState<IIncomeGoal[]>([]);
	const [ selectedGoal, setSelectedGoal ] = useState<string | null>(userGoal);

	const { getIncomeGoals, patchIncomeGoal, loadingStatus, errorMessage } = useFreelancerOnboardingService();

	const changeGoal = (goal: string) => {
		setSelectedGoal(goal);
	}

	useEffect(() => {
		if (incomeGoals.length === 0) {
			getIncomeGoals()
				.then(response => setIncomeGoals(response))
				.catch(e => console.error(e));
		}
	}, [ getIncomeGoals, incomeGoals.length ]);

	const onSubmit = () => {
		if (selectedGoal !== null) {
			patchIncomeGoal(selectedGoal)
				.then(() => onNext())
				.catch(e => console.error(e));
		}
	}

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<AnimatedStep>
			<h1 className={ 'title title--fs40' }>Jakich tygodniowych zarobków oczekujesz od Dealme?</h1>
			<div className={ styles['onboarding-step__items'] }>
				{ loadingStatus === 'idle' && incomeGoals.map(goal => {
					const isSelected = selectedGoal === goal.incomeGoal;
					return <IncomeGoalItem key={ goal.incomeGoal }
					                       text={ goal.range }
					                       description={ goal.description }
					                       isSelected={ isSelected }
					                       onChange={ () => changeGoal(goal.incomeGoal) }/>
				}) }
			</div>
			<button disabled={ selectedGoal === null }
			        onClick={ () => onSubmit() }
			        className={ 'btn' }>Przejdż dalej
			</button>
			{ errorMessage && <InputError text={ errorMessage }/> }
		</AnimatedStep>
	)
}

export default IncomeGoalStep;