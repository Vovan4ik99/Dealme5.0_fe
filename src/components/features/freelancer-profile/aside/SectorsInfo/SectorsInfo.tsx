import styles from "./SectorsInfo.module.scss";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import React from "react";
import SectorsModalItem from "@components/features/modals/sectors/SectorsModalItem/SectorsModalItem.tsx";
import {ISectorsInfoProps} from "@components/features/freelancer-profile/aside/SectorsInfo/sectorsInfoTypes.ts";

const SectorsInfo: React.FC<ISectorsInfoProps> = ({ isLoggedUserProfile, freelancerSectors, onSubmit }) => {

	const { openModal } = useModal();

	const onEdit = () => {
		openModal({
			id: 'SectorsModalItem',
			title: 'Edytuj sektory',
			shouldCloseOnSaving: true,
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			withSaveBtn: true,
			child: <SectorsModalItem onSave={ handleSave }/>
		});
	};

	const renderSectors = (): React.ReactNode[] => {
			return freelancerSectors.map(sector => {
				return <div key={ sector.id } className={ styles['sectors__item'] }>
					{ sector.name }
				</div>
			});
	};

	const handleSave = () => {
		onSubmit();
	};

	return (
		<div className={ styles['sectors'] }>
			<div className={ styles['sectors__wrapper'] }>
				<p className={ styles['sectors__title'] }>Sektory</p>
				{ isLoggedUserProfile &&
                    <ActionBtn kind={ 'Edit' }
                               onClick={ onEdit }
                               withBorder={ true }
                               backgroundColor={ 'transparent' }/>
				}
			</div>
			<div className={ styles['sectors__list'] }>
				{ renderSectors() }
			</div>
		</div>
	);
};

export default SectorsInfo;