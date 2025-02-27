import styles from "./SectorsInfo.module.scss";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import React, { useCallback, useEffect, useState } from "react";
import { ISector } from "@shared/onboardingTypes.ts";
import { calculateBlocks } from "@utils/sectorsUtils.ts";
import SectorsModalItem from "@components/features/EditModal/sectors/SectorsModalItem/SectorsModalItem.tsx";
import { ISectorsInfoProps } from "@components/features/FreelancerProfile/aside/SectorsInfo/sectorsInfoTypes.ts";
import { useFreelancerProfileAsideInfoService } from "@services/freelancer/freelancerProfileAsideInfoService.ts";

const SectorsInfo: React.FC<ISectorsInfoProps> = ({ freelancerId, isLoggedUserProfile }) => {

	const { openModal } = useModal();
	const { getFreelancerData } = useFreelancerProfileAsideInfoService();

	const [ freelancerSectors, setFreelancerSectors ] = useState<ISector[]>([]);

	const fetchFreelancerSectors = useCallback(() => {
		getFreelancerData(freelancerId)
			.then(data => setFreelancerSectors(data.sectors ?? []))
			.catch(console.error);
	}, [ freelancerId, getFreelancerData ]);

	useEffect(() => {
		fetchFreelancerSectors();
	}, [ fetchFreelancerSectors ]);

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

	const renderSectors = () => {
		const { visibleBlocks, remainingBlocks } = calculateBlocks(freelancerSectors.map(sector => sector.name));
		const resultItems: React.ReactNode[] = [];
		resultItems.push(freelancerSectors
			.filter(sector => visibleBlocks.includes(sector.name))
			.map(sector => {
				return <div key={ sector.id } className={ styles['sectors__item'] }>
					{ sector.name }
				</div>
			}));
		if (remainingBlocks.length > 0) {
			resultItems.push(
				<div key={ visibleBlocks.length + remainingBlocks.length }
				     className={ styles['sectors__item'] }
				>+{ remainingBlocks.length }</div>
			);
		}
		return resultItems;
	};

	const handleSave = () => {
		fetchFreelancerSectors();
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