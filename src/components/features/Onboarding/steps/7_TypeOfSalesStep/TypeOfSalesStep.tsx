import {useOnboardingService} from "@services/onboardingService.ts";
import React, {useEffect, useState} from "react";
import {ITypeOfSalesStepProps} from "./typeOfSalesStepTypes.ts";
import {ITypeOfSale} from "@shared/onboardingTypes.ts";
import styles from "../../Onboarding.module.scss";
import InputError from "@ui/InputError/InputError.tsx";
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";
import TypeOfSalesItem from "../../items/TypeOfSalesItem/TypeOfSalesItem.tsx";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";

const TypeOfSalesStep: React.FC<ITypeOfSalesStepProps> = ({userTypeOfSales, onNext}) => {

	const {getTypesOfSales, patchTypeOfSales, loadingStatus, errorMessage} = useOnboardingService();

	const [typesOfSales, setTypesOfSales] = useState<ITypeOfSale[]>([]);
	const [selectedTypeOfSales, setSelectedTypeOfSales] = useState<string | null>(userTypeOfSales);

	useEffect(() => {
		getTypesOfSales()
			.then((typeOfSales) => setTypesOfSales(typeOfSales))
			.catch(e => console.error(e));
	}, [getTypesOfSales]);

	const onSelect = (typeOfSales: string) => {
		setSelectedTypeOfSales(typeOfSales);
	}

	const onSubmit = () => {
		if (selectedTypeOfSales !== null) {
			patchTypeOfSales(selectedTypeOfSales)
				.then(() => onNext())
				.catch(e => console.error(e));
		}
	}

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<AnimatedStep>
			<h1 className={'title title--fs40'}>Czy oferowałeś swoje produkty firmom czy osobom prywatnym?</h1>
			<div className={styles['onboarding-step__items']}>
				{loadingStatus === 'idle' && typesOfSales.map(typeOfSales => {
					const isSelected = selectedTypeOfSales === typeOfSales.typeOfSales;
					return <TypeOfSalesItem key={typeOfSales.typeOfSales}
					                       text={typeOfSales.description}
					                       isSelected={isSelected}
					                       onSelect={() => onSelect(typeOfSales.typeOfSales)}/>
				})}
			</div>
			<button disabled={selectedTypeOfSales === null}
			        onClick={() => onSubmit()}
			        className={'btn'}>Przejdż dalej
			</button>
			{errorMessage && <InputError text={errorMessage}/>}
		</AnimatedStep>
	)
}

export default TypeOfSalesStep;