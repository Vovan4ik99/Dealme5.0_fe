import React, { useEffect, useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import styles from './TypeOfSalesStep.module.scss';
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import { ITypeOfSale } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";

const TypeOfSalesStep: React.FC<IStepComponentProps<IFreelancerData>> = ({ userData, onSubmit }) => {

	const { getTypesOfSales, patchTypeOfSales } = useFreelancerOnboardingService();

	const [ typesOfSales, setTypesOfSales ] = useState<ITypeOfSale[]>([]);
	const [ selectedTypeOfSale, setSelectedTypeOfSale ] = useState<ITypeOfSale | undefined>();

	useEffect(() => {
		getTypesOfSales()
			.then(setTypesOfSales)
			.catch(console.error);
	}, [ getTypesOfSales ]);

	useEffect(() => {
		if (!userData.typeOfSales) return;

		const selectedTypeOfSale = typesOfSales
			.find(typeOfSale => typeOfSale.typeOfSales === userData.typeOfSales);

		setSelectedTypeOfSale(selectedTypeOfSale);
	}, [ typesOfSales, userData.typeOfSales ]);

	const renderTypesOfSales = () => {
		return typesOfSales.map(typeOfSale => {
			const isActive = typeOfSale.typeOfSales === selectedTypeOfSale?.typeOfSales;
			return <OnboardingOption key={ typeOfSale.typeOfSales }
			                         title={ typeOfSale.description }
			                         onClick={ () => setSelectedTypeOfSale(typeOfSale) }
			                         titleFontSize={ 16 }
			                         isActive={ isActive }/>
		});
	};

	const handleSubmit = () => {
		if (!selectedTypeOfSale) return;

		patchTypeOfSales(selectedTypeOfSale.typeOfSales)
			.then(onSubmit)
			.catch(console.error)
	};

	return (
		<div className={ styles['sales'] }>
			<div className={ styles['sales__content'] }>
				{ renderTypesOfSales() }
			</div>
			<button className={ 'btn btn--mt0' }
			        disabled={ !selectedTypeOfSale }
			        onClick={ handleSubmit }>
				Przejdź dalej
			</button>
		</div>
	);
};

export default TypeOfSalesStep;