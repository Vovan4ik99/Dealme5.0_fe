import React, {useContext, useEffect, useState} from "react";
import styles from '../../Onboarding.module.scss';
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";
import OnboardingSearchBar from "../../items/OnboardingSearchBar/OnboardingSearchBar.tsx";
import {useOnboardingService} from "@services/onboardingService.ts";
import InputError from "@ui/InputError/InputError.tsx";
import {ISpecialization} from "@shared/onboardingTypes.ts";
import SpecializationItem from "../../items/SpecializationItem/SpecializationItem.tsx";
import {AuthContext} from "@context/AuthContext/AuthContext.ts";
import {ISpecializationStepProps} from "./specializationStepTypes.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";

const SpecializationStep: React.FC<ISpecializationStepProps> = ({onNext, userSpecialization}) => {

	const {loadingStatus, errorMessage, getSpecializations, patchSpecialization} = useOnboardingService();
	const [selectedSpecialization, setSelectedSpecialization] = useState<ISpecialization | null>(userSpecialization);
	const [specializations, setSpecializations] = useState<ISpecialization[]>([]);
	const [filteredSpecializations, setFilteredSpecializations] = useState<ISpecialization[]>([])
	const [visibleItemsCount, setVisibleItemsCount] = useState<number>(10);
	const {user} = useContext(AuthContext);

	const selectItem = (item: ISpecialization) => {
		setSelectedSpecialization(item);
	}

	const onSearch = (searchStr: string) => {
		setFilteredSpecializations(() => specializations.filter(item => {
			return item.name.toLowerCase().includes(searchStr.toLowerCase());
		}))
	}

	useEffect(() => {
		getSpecializations()
			.then(response => setSpecializations(response))
			.catch(e => console.log(e));
	}, [getSpecializations]);

	useEffect(() => {
		if (specializations.length !== 0) {
			setFilteredSpecializations(specializations);
		}
	}, [specializations]);

	const onSubmit = async () => {
		if (selectedSpecialization && user) {
			await patchSpecialization(user.id, selectedSpecialization.id)
				.then(() => {
					onNext();
				}).catch(e => console.log(e));
		}
	}

	const changeVisibilityCount = (newCount: number) => {
		setVisibleItemsCount(newCount);
	}

	const renderSpecializationItems = () => {
		const itemsToRender = visibleItemsCount < filteredSpecializations.length ?
			filteredSpecializations.slice(0, visibleItemsCount) : filteredSpecializations;
		return itemsToRender.slice(0, visibleItemsCount).map(
			item => <SpecializationItem
				key={item.id}
				isSelected={selectedSpecialization !== null && selectedSpecialization.id === item.id}
				item={item}
				onSelect={() => selectItem(item)}/>
		);
	}

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<AnimatedStep>
			<h1 className={'title title--fs40'}>Jakbyś określił siebie jako sprzedawcę?</h1>
			<div className={styles['onboarding-step__items']}>
				<OnboardingSearchBar onSearch={onSearch}/>
				<p className={styles['onboarding-step__add-text']}>Najpopularniejsze</p>
				{loadingStatus === 'idle' && renderSpecializationItems()}
				{visibleItemsCount < filteredSpecializations.length &&
					<button
						className={'btn btn--more'}
						onClick={() => changeVisibilityCount(filteredSpecializations.length)}>
						Rozwiń wszystkie (+{filteredSpecializations.length - visibleItemsCount})
					</button>
				}
			</div>
			<button disabled={selectedSpecialization === null}
			        onClick={() => onSubmit()}
			        className={'btn'}>
				Przejdż dalej
			</button>
			{errorMessage && <InputError text={errorMessage}/>}
		</AnimatedStep>
	)
}

export default SpecializationStep;