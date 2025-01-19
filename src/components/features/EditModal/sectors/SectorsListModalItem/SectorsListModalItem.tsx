import React, {useEffect, useState} from "react";
import {
	ISectorsListModalItemProps
} from "@components/features/EditModal/sectors/SectorsListModalItem/sectorsListModalItemTypes.ts";
import styles from "@components/features/EditModal/sectors/SectorsModalItem/SectorsModalItem.module.scss";
import {useOnboardingService} from "@services/onboardingService.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import {ISector} from "@shared/onboardingTypes.ts";
import DragAndDropContainer
	from "@components/features/EditModal/dragging/DragAndDropContainer/DragAndDropContainer.tsx";
import {ReactComponent as AddIcon} from "@icons/named_exported/add_icon.svg";
import DraggableSectorItem
	from "@components/features/EditModal/sectors/DraggableSectorItem/DraggableSectorItem.tsx";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import AddSectorsModalItem from "@components/features/EditModal/sectors/AddSectorsModalItem/AddSectorsModalItem.tsx";

const SectorsListModalItem: React.FC<ISectorsListModalItemProps> = ({freelancerSectors, onSelect}) => {

	const [allSectors, setAllSectors] = useState<ISector[]>([]);
	const [draggableSectors, setDraggableSectors] = useState<ISector[]>([]);

	const {getSectors, loadingStatus} = useOnboardingService();
	const {openModal} = useModal();

	useEffect(() => {
		getSectors()
			.then(sectors => setAllSectors(sectors))
			.catch(console.error);
	}, [getSectors]);

	useEffect(() => {
		setDraggableSectors(allSectors
			.filter(sector => freelancerSectors.includes(sector.id))
		);
	}, [allSectors, freelancerSectors]);

	const onSectorDelete = (draggableSector: ISector) => {
		onSelect(draggableSector.id);
	};

	const renderSectorItems = (draggableSector: ISector) => {
		return <DraggableSectorItem key={draggableSector.id}
		                            name={draggableSector.name}
		                            onDelete={() => onSectorDelete(draggableSector)}/>;
	};

	const onSectorsChange = (newItems: typeof draggableSectors) => {
		setDraggableSectors(newItems);
	};

	const onAddNewSectors = (sectors: ISector[]) => {
		sectors.forEach(sector => onSelect(sector.id));
	};

	const getSectorsToChoose = () => {
		return allSectors.filter(sector => !freelancerSectors.includes(sector.id));
	};

	const handleAddSectors = () => {
		openModal({
			id: 'sectorsAdd',
			title: 'Dodaj sektory',
			btnWithIcon: true,
			btnText: 'Dodaj sektory',
			shouldCloseOnSaving: true,
			child: <AddSectorsModalItem sectorsToChoose={getSectorsToChoose()} onSave={onAddNewSectors}/>
		});
	};

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<div>
			<h3 className={styles['item__title']}>Do jakiego sektora kierowałeś swoje produkty/usługi?</h3>
			<div className={`${styles['item__wrapper']} ${styles['item__wrapper--mb16']}`}>
				<DragAndDropContainer items={draggableSectors}
				                      renderItem={renderSectorItems}
				                      onItemsChange={onSectorsChange}/>
			</div>
			<button onClick={handleAddSectors} className={'btn btn--modal'}>
				<AddIcon/>
				<span>Dodaj kolejne sektory</span>
			</button>
		</div>
	);
}

export default SectorsListModalItem;