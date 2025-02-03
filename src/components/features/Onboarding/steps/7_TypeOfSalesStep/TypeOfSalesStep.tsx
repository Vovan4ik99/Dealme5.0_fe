import {useOnboardingService} from "@services/onboardingService.ts";
import React, {useState} from "react";
import {ITypeOfSalesStepProps} from "./typeOfSalesStepTypes.ts";
import styles from "../../Onboarding.module.scss";
import InputError from "@ui/InputError/InputError.tsx";
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import TypeOfSalesList from "@entities/TypeOfSalesList/TypeOfSalesList.tsx";

const TypeOfSalesStep: React.FC<ITypeOfSalesStepProps> = ({userTypeOfSales, onNext}) => {

	const {patchTypeOfSales, loadingStatus, errorMessage} = useOnboardingService();
	const [selectedTypeOfSales, setSelectedTypeOfSales] = useState<string | null>(userTypeOfSales);

	const onSelect = (typeOfSales: string) => {
		setSelectedTypeOfSales(typeOfSales);
	};

	const onSubmit = () => {
		if (selectedTypeOfSales !== null) {
			patchTypeOfSales(selectedTypeOfSales)
				.then(() => onNext())
				.catch(e => console.error(e));
		}
	};

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<AnimatedStep>
			<h1 className={'title title--fs40'}>Czy oferowałeś swoje produkty firmom czy osobom prywatnym?</h1>
			<div className={styles['onboarding-step__items']}>
				<TypeOfSalesList selectedTypeOfSale={selectedTypeOfSales} onSelect={onSelect}/>
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