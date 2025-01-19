import React, {useEffect, useState} from "react";
import {ITypeOfSalesListProps} from "@entities/TypeOfSalesList/typeOfSalesListTypes.ts";
import {useOnboardingService} from "@services/onboardingService.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import TypeOfSalesItem from "@components/features/Onboarding/items/TypeOfSalesItem/TypeOfSalesItem.tsx";
import {ITypeOfSale} from "@shared/onboardingTypes.ts";

const TypeOfSalesList: React.FC<ITypeOfSalesListProps> = ({selectedTypeOfSale, onSelect}) => {

	const [typesOfSales, setTypesOfSales] = useState<ITypeOfSale[]>([]);
	
	const {getTypesOfSales, loadingStatus} = useOnboardingService();

	useEffect(() => {
		getTypesOfSales()
			.then(setTypesOfSales)
			.catch(console.error);
	}, [getTypesOfSales]);

	const renderItems = () => {
		return typesOfSales.map(typeOfSale => {
			const isSelected = selectedTypeOfSale === typeOfSale.typeOfSales;
			return <TypeOfSalesItem key={typeOfSale.typeOfSales}
			                        text={typeOfSale.description}
			                        isSelected={isSelected}
			                        onSelect={() => onSelect(typeOfSale.typeOfSales)}/>
		});
	}
	
	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}
	
	return (
		<>
			{renderItems()}
		</>
	)
};

export default TypeOfSalesList;