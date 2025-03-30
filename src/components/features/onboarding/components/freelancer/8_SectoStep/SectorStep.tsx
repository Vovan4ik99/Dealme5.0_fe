import React, { useEffect, useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import styles from './SectorStep.module.scss';
import OnboardingSearchBar from "@components/features/onboarding/OnboardingSearchBar/OnboardingSearchBar.tsx";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import { ISector } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import OnboardingMoreBtn from "@ui/onboarding/OnboardingMoreBtn/OnboardingMoreBtn.tsx";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";

const SectorStep: React.FC<IStepComponentProps<IFreelancerData>> = ({ userData, onSubmit }) => {

	const { getSectors, patchSectors } = useFreelancerOnboardingService();

	const [ selectedSectors, setSelectedSectors ] = useState<ISector[]>(userData.sectors);
	const [ sectors, setSectors ] = useState<ISector[]>([]);
	const [ visibleItemsCount, setVisibleItemsCount ] = useState<number>(10);
	const [ filteredSectors, setFilteredSectors ] = useState<ISector[]>([]);

	useEffect(() => {
		getSectors()
			.then(response => {
				setSectors(response);
				setFilteredSectors(response);
			})
			.catch(console.error);
	}, [ getSectors ]);

	const onSearch = (text: string) => {
		if (!text) {
			setFilteredSectors(sectors);
			return;
		}
		setFilteredSectors(sectors.filter(item => item.name.toLowerCase().includes(text.toLowerCase())));
	};

	const handleSubmit = () => {
		if (selectedSectors.length === 0) return;

		patchSectors(selectedSectors.map(sector => sector.id))
			.then(onSubmit)
			.catch(console.error);
	};

	const handleSectorClick = (sector: ISector) => {
		setSelectedSectors(prevState => {
			if (prevState.map(sector => sector.id).includes(sector.id)) {
				return prevState.filter(item => item.id !== sector.id);
			}
			return [ ...prevState, sector ];
		});
	};

	const renderContent = () => {
		return filteredSectors.slice(0, visibleItemsCount).map(sector => {
			const isActive = selectedSectors.map(item => item.id).includes(sector.id);
			return <OnboardingOption key={ sector.id }
			                         title={ sector.name }
			                         withTooltipIcon
			                         titleFontSize={ 16 }
			                         isActive={ isActive }
			                         tooltipText={ sector.description }
			                         onClick={ () => handleSectorClick(sector) }/>
		});
	};

	return (
		<div className={ styles['sector'] }>
			<OnboardingSearchBar onSearch={ onSearch }/>
			<div className={ styles['sector__content'] }>
				<p className={ styles['sector__text'] }>Najpopularniejsze</p>
				<div className={ styles['sector__items'] }>
					{ renderContent() }
				</div>
				{ filteredSectors.length > visibleItemsCount &&
                    <OnboardingMoreBtn onClick={ () => setVisibleItemsCount(filteredSectors.length) }
                                       itemsCount={ filteredSectors.length - visibleItemsCount }/>
				}
			</div>
			<button className={ 'btn btn--mt0' }
			        disabled={ false }
			        onClick={ handleSubmit }>
				Przejdź dalej
			</button>
		</div>
	);
};

export default SectorStep;