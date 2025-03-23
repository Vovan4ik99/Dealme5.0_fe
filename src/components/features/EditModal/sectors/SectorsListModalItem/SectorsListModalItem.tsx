import React, { useEffect, useState } from "react";
import {
	ISectorsListModalItemProps
} from "@components/features/EditModal/sectors/SectorsListModalItem/sectorsListModalItemTypes.ts";
import styles from "@components/features/EditModal/sectors/SectorsModalItem/SectorsModalItem.module.scss";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import { ISector } from "@shared/onboardingTypes.ts";
import DragAndDropContainer
	from "@components/features/EditModal/dragging/DragAndDropContainer/DragAndDropContainer.tsx";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";
import DraggableSectorItem from "@components/features/EditModal/sectors/DraggableSectorItem/DraggableSectorItem.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import AddSectorsModalItem from "@components/features/EditModal/sectors/AddSectorsModalItem/AddSectorsModalItem.tsx";

const SectorsListModalItem: React.FC<ISectorsListModalItemProps> = ({ freelancerSectors, onSelect, onSectorsDrag }) => {

	const [ allSectors, setAllSectors ] = useState<ISector[]>([]);

	const { getSectors, loadingStatus } = useFreelancerOnboardingService();
	const { openModal } = useModal();

	useEffect(() => {
		getSectors()
			.then(sectors => setAllSectors(sectors))
			.catch(console.error);
	}, [ getSectors ]);

	const onSectorDelete = (draggableSector: ISector) => {
		onSelect(draggableSector);
	};

	const renderSectorItems = (draggableSector: ISector) => {
		return <DraggableSectorItem key={ draggableSector.id }
		                            name={ draggableSector.name }
		                            onDelete={ () => onSectorDelete(draggableSector) }/>;
	};

	const onAddNewSectors = (sectors: ISector[]) => {
		sectors.forEach(sector => onSelect(sector));
	};

	const getSectorsToChoose = () => {
		return allSectors.filter(sector => !freelancerSectors.some(s => s.id === sector.id));
	};

	const handleAddSectors = () => {
		openModal({
			id: 'AddSectorsModalItem',
			title: 'Dodaj sektory',
			btnWithIcon: true,
			btnText: 'Dodaj sektory',
			shouldCloseOnSaving: true,
			withSaveBtn: true,
			child: <AddSectorsModalItem sectorsToChoose={ getSectorsToChoose() } onSave={ onAddNewSectors }/>
		});
	};

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<div>
			<h3 className={ styles['item__title'] }>Do jakiego sektora kierowałeś swoje produkty/usługi?</h3>
			<div className={ `${ styles['item__wrapper'] } ${ styles['item__wrapper--mb16'] }` }>
				<DragAndDropContainer items={ freelancerSectors }
				                      renderItem={ renderSectorItems }
				                      onItemsChange={ onSectorsDrag }/>
			</div>
			<button onClick={ handleAddSectors } className={ 'btn btn--modal' }>
				<AddIcon/>
				<span>Dodaj kolejne sektory</span>
			</button>
		</div>
	);
}

export default SectorsListModalItem;