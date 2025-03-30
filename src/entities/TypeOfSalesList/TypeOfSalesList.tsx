import React, { useEffect, useState } from "react";
import { ITypeOfSalesListProps } from "@entities/TypeOfSalesList/typeOfSalesListTypes.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import TypeOfSalesItem from "@components/features/freelancer-onboarding/items/TypeOfSalesItem/TypeOfSalesItem.tsx";
import { ITypeOfSale } from "@shared/onboarding/freelancerOnboardingTypes.ts";

const TypeOfSalesList: React.FC<ITypeOfSalesListProps> = ({ selectedTypeOfSale, onSelect }) => {

	const { getTypesOfSales, loadingStatus } = useFreelancerOnboardingService();

	const [ typesOfSales, setTypesOfSales ] = useState<ITypeOfSale[]>([]);

	useEffect(() => {
		getTypesOfSales()
			.then(setTypesOfSales)
			.catch(console.error);
	}, [ getTypesOfSales ]);

	const renderItems = () => {
		return typesOfSales.map(typeOfSale => {
			const isSelected = selectedTypeOfSale === typeOfSale.typeOfSales;
			return <TypeOfSalesItem key={ typeOfSale.typeOfSales }
			                        text={ typeOfSale.description }
			                        isSelected={ isSelected }
			                        onSelect={ () => onSelect(typeOfSale.typeOfSales) }/>
		});
	}

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<>
			{ renderItems() }
		</>
	)
};

export default TypeOfSalesList;