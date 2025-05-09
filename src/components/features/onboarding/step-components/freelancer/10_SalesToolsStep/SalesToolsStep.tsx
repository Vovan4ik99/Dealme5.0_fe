import React, { useContext, useEffect, useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import styles from "./SalesToolsStep.module.scss";
import { ISalesTool } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import SalesToolsList from "@entities/SalesToolsList/SalesToolsList.tsx";

const SalesToolsStep: React.FC<IStepComponentProps<IFreelancerData>> = ({ userData, onSubmit }) => {

	const { getSalesTools, patchSalesTools, updateOnboardingStatus } = useFreelancerOnboardingService();
	const { getLoggedUserData } = useContext(AuthContext);

	const [ tools, setTools ] = useState<ISalesTool[]>([]);
	const [ selectedTools, setSelectedTools ] = useState<ISalesTool[]>(userData.salesTools);

	useEffect(() => {
		getSalesTools()
			.then(setTools)
			.catch(console.error);
	}, [ getSalesTools ]);

	const handleSubmit = () => {
		if (selectedTools.length === 0) return;

		patchSalesTools(selectedTools.map(tool => tool.id))
			.then(updateOnboardingStatus)
			.then(() => getLoggedUserData(localStorage.getItem('token')!))
			.then(onSubmit)
			.catch(console.error);
	};

	return (
		<div className={ styles['tools'] }>
			<SalesToolsList tools={ tools }
			                selectedTools={ selectedTools }
			                setSelectedTools={ setSelectedTools }/>
			<button className={ `btn 
								 btn--primary 
								 ${ styles['tools__btn'] }` }
			        disabled={ selectedTools.length === 0 }
			        onClick={ handleSubmit }>
				Zakończ i przejdź do panelu
			</button>
		</div>
	);
};

export default SalesToolsStep;