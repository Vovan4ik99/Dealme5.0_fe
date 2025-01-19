import React, {useCallback, useContext, useEffect, useState} from "react";
import {ISectorsModalItemProps} from "@components/features/EditModal/sectors/SectorsModalItem/sectorsModalItemTypes.ts";
import styles from "./SectorsModalItem.module.scss";
import {useOnboardingService} from "@services/onboardingService.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import {AuthContext} from "@context/AuthContext/AuthContext.ts";
import TypeOfSalesList from "@entities/TypeOfSalesList/TypeOfSalesList.tsx";
import SectorsListModalItem
	from "@components/features/EditModal/sectors/SectorsListModalItem/SectorsListModalItem.tsx";

const SectorsModalItem: React.FC<ISectorsModalItemProps> = ({onSave, registerOnSave}) => {

	const [selectedTypeOfSale, setSelectedTypeOfSale] = useState<string | null>(null);
	const [selectedSectors, setSelectedSectors] = useState<number[]>([]);

	const {patchTypeOfSales, patchSectors, loadingStatus} = useOnboardingService();
	const {user} = useContext(AuthContext);

	useEffect(() => {
		if (!user) return;
		setSelectedTypeOfSale(user.typeOfSales);
		setSelectedSectors(user.sectors.map(s => s.id));
	}, [user]);

	const handleTypeOfSaleSave = useCallback(async () => {
		if (!selectedTypeOfSale) return;
		await patchTypeOfSales(selectedTypeOfSale);
	}, [patchTypeOfSales, selectedTypeOfSale]);

	const handleSectorsSave = useCallback(async () => {
		if (selectedSectors.length === 0) return;
		await patchSectors(selectedSectors);
	}, [patchSectors, selectedSectors]);

	const handleSave = useCallback(() => {
		handleTypeOfSaleSave()
			.then(handleSectorsSave)
			.then(onSave)
			.catch(console.error);
	}, [handleSectorsSave, handleTypeOfSaleSave, onSave]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [handleSave, onSave, registerOnSave]);

	const onTypeOfSaleSelect = (typeOfSale: string) => {
		setSelectedTypeOfSale(typeOfSale);
	};

	const onSectorSelect = (sectorId: number) => {
		setSelectedSectors(prevState => {
			if (prevState.includes(sectorId)) {
				return prevState.filter(s => s !== sectorId);
			} else {
				return [...prevState, sectorId];
			}
		});
	};

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<div className={styles['item']}>
			<div>
				<h3 className={styles['item__title']}>Czy oferowałeś swoje produkty firmom<br/> czy osobom prywatnym?</h3>
				<div className={styles['item__wrapper']}>
					<TypeOfSalesList selectedTypeOfSale={selectedTypeOfSale} onSelect={onTypeOfSaleSelect}/>
				</div>
			</div>
			<SectorsListModalItem freelancerSectors={selectedSectors} onSelect={onSectorSelect}/>
		</div>
	);
};

export default SectorsModalItem;