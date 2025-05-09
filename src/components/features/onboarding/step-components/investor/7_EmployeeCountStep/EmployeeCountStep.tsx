import React, { useEffect, useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IInvestorData } from "@shared/investor/common.ts";
import styles from "./EmployeeCountStep.module.scss";
import { useInvestorOnboardingService } from "@services/onboarding/investorOnboardingService.ts";
import { IEmployeeCountRange } from "@shared/onboarding/investorOnboardingTypes.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";

const EmployeeCountStep: React.FC<IStepComponentProps<IInvestorData>> = ({ userData, onSubmit }) => {

	const { getEmployeeCountRanges, patchEmployeeCountRange } = useInvestorOnboardingService();

	const [ ranges, setRanges ] = useState<IEmployeeCountRange[]>([]);
	const [ selectedRange, setSelectedRange ] = useState<IEmployeeCountRange | undefined>();

	useEffect(() => {
		getEmployeeCountRanges()
			.then(setRanges)
			.catch(console.error);
	}, [ getEmployeeCountRanges ]);

	useEffect(() => {
		if (ranges.length === 0 || !userData.employeeCountRange) return;

		const activeRange = ranges
			.find(range => range.name === userData.employeeCountRange);
		setSelectedRange(activeRange);
	}, [ ranges, userData.employeeCountRange ]);

	const renderContent = () => {
		return ranges.map(range => {
			const isActive = range.name === selectedRange?.name;
			return <OnboardingOption key={ range.name }
			                         title={ range.description }
			                         isActive={ isActive }
			                         onClick={ () => setSelectedRange(range) }/>
		});
	};

	const handleSubmit = () => {
		if (!selectedRange) return;

		patchEmployeeCountRange(selectedRange.name)
			.then(onSubmit)
			.catch(console.error);
	};

	return (
		<div className={ styles['count'] }>
			<div className={ styles['count__content'] }>
				{ renderContent() }
			</div>
			<button className={ `btn 
								 btn--primary 
								 ${ styles['count__btn'] }` }
			        disabled={ !selectedRange }
			        onClick={ handleSubmit }>
				Przejdź dalej
			</button>
		</div>
	);
};

export default EmployeeCountStep;