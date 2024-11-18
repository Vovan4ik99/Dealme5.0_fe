import React, {useEffect, useState} from "react";
import styles from '../../Onboarding.module.scss';
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";
import OnboardingSearchBar from "../../items/OnboardingSearchBar/OnboardingSearchBar.tsx";
import {useOnboardingService} from "../../../../../services/onboardingService.ts";
import InputError from "../../../../ui/InputError/InputError.tsx";
import {ISpecialization} from "../../../../../shared/onboardingTypes.ts";
import SpecializationItem from "../../items/SpecializationItem/SpecializationItem.tsx";

const SpecializationStep: React.FC<{onNext: () => void}> = ({onNext}) => {

	const {loadingStatus, errorMessage, getSpecializations, patchSpecialization} = useOnboardingService();
	const [selectedSpecialization, setSelectedSpecialization] = useState<ISpecialization | null>(null);
	const [specializations, setSpecializations] = useState<ISpecialization[]>([]);
	const [filteredSpecializations, setFilteredSpecializations] = useState<ISpecialization[]>([])
	const [visibleItemsCount, setVisibleItemsCount] = useState<number>(10);

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
		if (selectedSpecialization) {
			await patchSpecialization(selectedSpecialization.id, selectedSpecialization)
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
				selectedItem={selectedSpecialization}
				item={item}
				onSelect={() => selectItem(item)}/>
		);
	}

	return (
		<AnimatedStep>
			<h1 className={'title title--fs40'}>Jakbyś określił siebie jako sprzedawcę?</h1>
			<div className={styles['onboarding-step__items']}>
				<OnboardingSearchBar onSearch={onSearch}/>
				<p className={styles['onboarding-step__add-text']}>Najpopularniejsze</p>
				{loadingStatus === 'idle' && renderSpecializationItems()}
				{visibleItemsCount < specializations.length &&
					<button
						className={'btn btn--more'}
						onClick={() => changeVisibilityCount(specializations.length)}>
						Rozwiń wszystkie (+{specializations.length - visibleItemsCount})
					</button>
				}
			</div>
			<button disabled={selectedSpecialization === null}
			        onClick={() => onSubmit()} className={'btn'}>Przejdź dalej
			</button>
			{errorMessage && <InputError text={errorMessage}/>}
		</AnimatedStep>
	)
}

export default SpecializationStep;