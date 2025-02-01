import styles from "./SectorsInfo.module.scss";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "@context/AuthContext/AuthContext.ts";
import {ISector} from "@shared/onboardingTypes.ts";
import {calculateBlocks} from "@utils/sectorsUtils.ts";
import SectorsModalItem from "@components/features/EditModal/sectors/SectorsModalItem/SectorsModalItem.tsx";

const SectorsInfo = () => {

	const [freelancerSectors, setFreelancerSectors] = useState<ISector[]>([])

	const {openModal} = useModal();
	const {user, getLoggedUserData} = useContext(AuthContext);

	useEffect(() => {
		setFreelancerSectors(user?.sectors ?? [])
	}, [user?.sectors]);

	if (user === null) {
		return null;
	}

	const onEdit = () => {
        openModal({
	        id: 'unknown',
	        title: 'Edytuj sektory',
	        shouldCloseOnSaving: true,
	        btnText: 'Zapisz zmiany',
	        btnWithIcon: false,
	        child: <SectorsModalItem onSave={handleSave}/>
        });
	};

	const renderSectors = () => {
		const {visibleBlocks, remainingBlocks} = calculateBlocks(freelancerSectors.map(sector => sector.name));
		const resultItems: React.ReactNode[] = [];
		resultItems.push(freelancerSectors
			.filter(sector => visibleBlocks.includes(sector.name))
			.map(sector => {
				return <div key={sector.id} className={styles['sectors__item']}>
					{sector.name}
				</div>
			}));
		if (remainingBlocks.length > 0) {
			resultItems.push(
				<div key={visibleBlocks.length + remainingBlocks.length}
				     className={styles['sectors__item']}
				>+{remainingBlocks.length}</div>
			);
		}
		return resultItems;
	};

	const handleSave = () => {
		getLoggedUserData(localStorage.getItem('token') as string);
	}

	return (
		<div className={styles['sectors']}>
			<div className={styles['sectors__wrapper']}>
				<p className={styles['sectors__title']}>Sektory</p>
				<ActionBtn kind={'Edit'}
				           onClick={onEdit}
				           withBorder={true}
				           backgroundColor={'transparent'}/>
			</div>
			<div className={styles['sectors__list']}>
				{renderSectors()}
			</div>
		</div>
	);
};

export default SectorsInfo;