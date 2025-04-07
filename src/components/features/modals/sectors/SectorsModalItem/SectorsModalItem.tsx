import React, { useCallback, useContext, useEffect, useState } from "react";
import { ISectorsModalItemProps } from "@components/features/modals/sectors/SectorsModalItem/sectorsModalItemTypes.ts";
import styles from "./SectorsModalItem.module.scss";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import SectorsListModalItem from "@components/features/modals/sectors/SectorsListModalItem/SectorsListModalItem.tsx";
import { ISector, ITypeOfSale } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import { useFreelancerProfileService } from "@services/freelancer/freelancerProfileService.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";

const SectorsModalItem: React.FC<ISectorsModalItemProps> = ({ onSave, registerOnSave }) => {

	const [ typesOfSales, setTypesOfSales ] = useState<ITypeOfSale[]>([]);
	const [ selectedTypeOfSale, setSelectedTypeOfSale ] = useState<ITypeOfSale | undefined>();
	const [ selectedSectors, setSelectedSectors ] = useState<ISector[]>([]);

	const { getTypesOfSales, patchTypeOfSales, patchSectors, loadingStatus } = useFreelancerOnboardingService();
	const { getFreelancerPrimaryInfo } = useFreelancerProfileService();
	const { user } = useContext(AuthContext);

	useEffect(() => {
		getTypesOfSales()
			.then(setTypesOfSales)
			.catch(console.error);
	}, [ getTypesOfSales ]);

	useEffect(() => {
		if (!user) return;

		getFreelancerPrimaryInfo(user.id)
			.then(data => {
				setSelectedSectors(data.sectors ?? []);
				setSelectedTypeOfSale(
					typesOfSales.find(
						typeOfSale => typeOfSale.typeOfSales === data.typeOfSales
					)
				);
			})
			.catch(console.error)
	}, [ setSelectedTypeOfSale, setSelectedSectors, getFreelancerPrimaryInfo, user, typesOfSales ]);

	const handleTypeOfSaleSave = useCallback(async () => {
		if (!selectedTypeOfSale) return;
		await patchTypeOfSales(selectedTypeOfSale.typeOfSales);
	}, [ patchTypeOfSales, selectedTypeOfSale ]);

	const handleSectorsSave = useCallback(async () => {
		await patchSectors(selectedSectors.map(s => s.id));
	}, [ patchSectors, selectedSectors ]);

	const handleSave = useCallback(() => {
		handleTypeOfSaleSave()
			.then(handleSectorsSave)
			.then(onSave)
			.catch(console.error);
	}, [ handleSectorsSave, handleTypeOfSaleSave, onSave ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, onSave, registerOnSave ]);

	const onSectorsDrag = (newItems: typeof selectedSectors) => {
		setSelectedSectors(newItems);
	};

	const onSectorSelect = (sector: ISector) => {
		setSelectedSectors(prevState => {
			if (prevState.includes(sector)) {
				return prevState.filter(s => s !== sector);
			} else {
				return [ ...prevState, sector ];
			}
		});
	};

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

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<div className={ styles['item'] }>
			<div>
				<h3 className={ styles['item__title'] }>
					Czy oferowałeś swoje produkty firmom<br/>
					czy osobom prywatnym?
				</h3>
				<div className={ styles['item__wrapper'] }>
					{ renderTypesOfSales() }
				</div>
			</div>
			<SectorsListModalItem freelancerSectors={ selectedSectors }
			                      onSelect={ onSectorSelect }
			                      onSectorsDrag={ onSectorsDrag }/>
		</div>
	);
};

export default SectorsModalItem;