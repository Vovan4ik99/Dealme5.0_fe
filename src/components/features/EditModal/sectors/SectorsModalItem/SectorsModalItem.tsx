import React, { useCallback, useContext, useEffect, useState } from "react";
import {
	ISectorsModalItemProps
} from "@components/features/EditModal/sectors/SectorsModalItem/sectorsModalItemTypes.ts";
import styles from "./SectorsModalItem.module.scss";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import TypeOfSalesList from "@entities/TypeOfSalesList/TypeOfSalesList.tsx";
import SectorsListModalItem from "@components/features/EditModal/sectors/SectorsListModalItem/SectorsListModalItem.tsx";
import { ISector } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import { useFreelancerProfileService } from "@services/freelancer/freelancerProfileService.ts";

const SectorsModalItem: React.FC<ISectorsModalItemProps> = ({ onSave, registerOnSave }) => {

	const [ selectedTypeOfSale, setSelectedTypeOfSale ] = useState<string | null>(null);
	const [ selectedSectors, setSelectedSectors ] = useState<ISector[]>([]);

	const { patchTypeOfSales, patchSectors, loadingStatus } = useFreelancerOnboardingService();
	const { getFreelancerPrimaryInfo } = useFreelancerProfileService();
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (!user) return;
		getFreelancerPrimaryInfo(user.id)
			.then(data => {
				setSelectedSectors(data.sectors ?? []);
				setSelectedTypeOfSale(data.typeOfSales ?? null);
			})
			.catch(console.error)
	}, [ setSelectedTypeOfSale, setSelectedSectors, getFreelancerPrimaryInfo, user ]);

	const handleTypeOfSaleSave = useCallback(async () => {
		if (!selectedTypeOfSale) return;
		await patchTypeOfSales(selectedTypeOfSale);
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

	const onTypeOfSaleSelect = (typeOfSale: string) => {
		setSelectedTypeOfSale(typeOfSale);
	};

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

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<div className={ styles['item'] }>
			<div>
				<h3 className={ styles['item__title'] }>Czy oferowałeś swoje produkty firmom<br/> czy osobom prywatnym?
				</h3>
				<div className={ styles['item__wrapper'] }>
					<TypeOfSalesList selectedTypeOfSale={ selectedTypeOfSale } onSelect={ onTypeOfSaleSelect }/>
				</div>
			</div>
			<SectorsListModalItem freelancerSectors={ selectedSectors }
			                      onSelect={ onSectorSelect }
			                      onSectorsDrag={ onSectorsDrag }/>
		</div>
	);
};

export default SectorsModalItem;