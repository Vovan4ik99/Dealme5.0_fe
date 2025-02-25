import React, { useEffect, useState } from "react";
import { ISectorStepProps } from "./sectorStepTypes.ts";
import { ISector } from "@shared/onboardingTypes.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import styles from "../../Onboarding.module.scss";
import OnboardingSearchBar from "../../items/OnboardingSearchBar/OnboardingSearchBar.tsx";
import InputError from "@ui/InputError/InputError.tsx";
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";
import SectorItem from "../../items/SectorItem/SectorItem.tsx";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";

const SectorStep: React.FC<ISectorStepProps> = ({ userSectors, onNext }) => {

	const { loadingStatus, errorMessage, getSectors, patchSectors } = useFreelancerOnboardingService();

	const [ selectedSectors, setSelectedSectors ] = useState<ISector[]>(userSectors);
	const [ sectors, setSectors ] = useState<ISector[]>([]);
	const [ visibleItemsCount, setVisibleItemsCount ] = useState<number>(10);
	const [ filteredSectors, setFilteredSectors ] = useState<ISector[]>([]);

	useEffect(() => {
		getSectors()
			.then(sectors => setSectors(sectors))
			.catch(e => console.error(e));
	}, [ getSectors ]);

	useEffect(() => {
		if (sectors.length !== 0) {
			setFilteredSectors(sectors);
		}
	}, [ sectors ]);

	const onSearch = (searchStr: string) => {
		setFilteredSectors(() => sectors.filter(item => {
			return item.name.toLowerCase().includes(searchStr.toLowerCase());
		}))
	}

	const onSelect = (sector: ISector) => {
		setSelectedSectors((prevSectors) => {
			if (prevSectors.includes(sector)) {
				return prevSectors.filter(prevSector => prevSector.id !== sector.id);
			}
			return [ ...prevSectors, sector ];
		});
	}

	const onSubmit = () => {
		if (selectedSectors.length > 0) {
			patchSectors(selectedSectors.map(sector => sector.id))
				.then(() => onNext())
				.catch(e => console.error(e));
		}
	}

	const renderSectorItems = () => {
		if (filteredSectors.length <= 0) {
			return <></>;
		}
		return filteredSectors.slice(0, visibleItemsCount).map(sector => {
			const isSelected = selectedSectors.some(selectedSector => selectedSector.id === sector.id);
			return <SectorItem key={ sector.id }
			                   text={ sector.name }
			                   description={ sector.description }
			                   onSelect={ () => onSelect(sector) }
			                   isSelected={ isSelected }/>;
		});
	}

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<AnimatedStep>
			<h1 className={ 'title title--fs40' }>Do jakiego sektora kierowałeś swoje produkty/usługi?</h1>
			<div className={ styles['onboarding-step__items'] }>
				<OnboardingSearchBar onSearch={ onSearch }/>
				<p className={ styles['onboarding-step__add-text'] }>Najpopularniejsze</p>
				{ loadingStatus === 'idle' && renderSectorItems() }
				{ visibleItemsCount < filteredSectors.length &&
                    <button
                        className={ 'btn btn--more' }
                        onClick={ () => setVisibleItemsCount(sectors.length) }>
                        Rozwiń wszystkie (+{ filteredSectors.length - visibleItemsCount })
                    </button>
				}
			</div>
			<button disabled={ selectedSectors.length === 0 }
			        onClick={ () => onSubmit() }
			        className={ 'btn' }>Przejdż dalej
			</button>
			{ errorMessage && <InputError text={ errorMessage }/> }
		</AnimatedStep>
	);
}

export default SectorStep;