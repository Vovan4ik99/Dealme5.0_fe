import styles from '../SectorsModalItem/SectorsModalItem.module.scss';
import React, { useCallback, useEffect, useState } from "react";
import {
	IAddSectorsModalItemProps
} from "@components/features/EditModal/sectors/AddSectorsModalItem/addSectorsModalItemTypes.ts";
import { ISector } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import SectorItem from "@components/features/freelancer-onboarding/items/SectorItem/SectorItem.tsx";

const AddSectorsModalItem: React.FC<IAddSectorsModalItemProps> = ({
	                                                                  sectorsToChoose,
	                                                                  onSave,
	                                                                  registerOnSave
                                                                  }) => {
	
	const [selectedSectors, setSelectedSectors] = useState<ISector[]>([]);

	const handleSave = useCallback(() => {
		onSave(selectedSectors);
	}, [onSave, selectedSectors]);
	
	useEffect(() => {
		registerOnSave!(handleSave);
	}, [handleSave, registerOnSave]);

	const onSectorSelect = (sector: ISector) => {
		setSelectedSectors(prevState => {
			return prevState.includes(sector)
				? prevState.filter(item => item !== sector)
				: [...prevState, sector];
		});
	};

	const renderItems = () => {
		return sectorsToChoose.map(sector => {
			const isSelected = selectedSectors.includes(sector);
			return <SectorItem key={sector.id}
			                   isSelected={isSelected}
			                   text={sector.name}
			                   description={sector.description}
			                   onSelect={() => onSectorSelect(sector)}/>
		});
	};
	
	return (
		<div className={styles['item__wrapper']}>
			{renderItems()}
		</div>
	)
}

export default AddSectorsModalItem;