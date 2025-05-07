import React, { useEffect, useState } from "react";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import { ISpecialization } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";
import styles from "./SpecializationStep.module.scss";
import OnboardingSearchBar from "@components/features/onboarding/OnboardingSearchBar/OnboardingSearchBar.tsx";
import OnboardingMoreBtn from "@ui/onboarding/OnboardingMoreBtn/OnboardingMoreBtn.tsx";

const SpecializationStep: React.FC<IStepComponentProps<IFreelancerData>> = ({ userData, onSubmit }) => {

	const { getSpecializations, patchSpecialization } = useFreelancerOnboardingService();

	const [ selectedSpecialization, setSelectedSpecialization ] = useState<ISpecialization | undefined>(
		userData.specialization
	);
	const [ specializations, setSpecializations ] = useState<ISpecialization[]>([]);
	const [ filteredSpecializations, setFilteredSpecializations ] = useState<ISpecialization[]>([])
	const [ visibleItemsCount, setVisibleItemsCount ] = useState<number>(10);

	useEffect(() => {
		getSpecializations()
			.then(response => {
				setSpecializations(response);
				setFilteredSpecializations(response);
			})
			.catch(console.error);
	}, [ getSpecializations ]);

	const onSearch = (searchStr: string) => {
		setFilteredSpecializations(() => specializations.filter(item => {
			return item.name.toLowerCase().includes(searchStr.toLowerCase());
		}))
	};

	const renderSpecializationItems = () => {
		return filteredSpecializations.slice(0, visibleItemsCount).map(
			item => {
				const isActive = selectedSpecialization?.id === item.id;
				return <OnboardingOption key={ item.id }
				                         title={ item.name }
				                         withTooltipIcon={ true }
				                         titleFontSize={ 16 }
				                         tooltipText={
					                         item.description
						                         .slice(0, 1)
						                         .toUpperCase()
						                         .concat(item.description.slice(1))
				                         }
				                         isActive={ isActive }
				                         onClick={ () => setSelectedSpecialization(item) }/>
			}
		);
	};

	const handleSubmit = () => {
		if (!selectedSpecialization) return;

		patchSpecialization(userData.id, selectedSpecialization.id)
			.then(onSubmit)
			.catch(console.error);
	};

	return (
		<div className={ styles['specialization'] }>
			<OnboardingSearchBar onSearch={ onSearch }/>
			<div className={ styles['specialization__content'] }>
				<p className={ styles['specialization__text'] }>Najpopularniejsze</p>
				<div className={ styles['specialization__items'] }>
					{ renderSpecializationItems() }
				</div>
				{ visibleItemsCount < filteredSpecializations.length &&
                    <OnboardingMoreBtn itemsCount={ filteredSpecializations.length - visibleItemsCount }
                                       onClick={ () => setVisibleItemsCount(filteredSpecializations.length) }/>
				}
			</div>
			<button disabled={ selectedSpecialization === null }
			        onClick={ handleSubmit }
			        className={ styles["specialization__btn"] }>
				Przejdż dalej
			</button>
		</div>
	);
};

export default SpecializationStep;