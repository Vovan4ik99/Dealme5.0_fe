import styles from '../SectorsModalItem/SectorsModalItem.module.scss';
import React, { useCallback, useEffect, useState } from "react";
import { IAddSectorsModalItemProps } from "./addSectorsModalItemTypes.ts";
import { ISector } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";

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
			const isActive = selectedSectors.includes(sector);
			return <OnboardingOption key={ sector.id }
			                         title={ sector.name }
			                         withTooltipIcon
			                         titleFontSize={ 16 }
			                         isActive={ isActive }
			                         tooltipText={ sector.description }
			                         onClick={ () => onSectorSelect(sector) }/>
		});
	};
	
	return (
		<div className={styles['item__wrapper']}>
			{renderItems()}
		</div>
	)
}

export default AddSectorsModalItem;