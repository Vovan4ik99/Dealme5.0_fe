import styles from "./SectorsInfo.module.scss";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import React, { useCallback, useEffect, useState } from "react";
import { ISector } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import SectorsModalItem from "@components/features/modals/sectors/SectorsModalItem/SectorsModalItem.tsx";
import { ISectorsInfoProps } from "@components/features/freelancer-profile/aside/SectorsInfo/sectorsInfoTypes.ts";
import { useFreelancerProfileService } from "@services/freelancer/freelancerProfileService.ts";

const SectorsInfo: React.FC<ISectorsInfoProps> = ({ freelancerId, isLoggedUserProfile }) => {

	const { openModal } = useModal();
	const { getFreelancerPrimaryInfo } = useFreelancerProfileService();

	const [ freelancerSectors, setFreelancerSectors ] = useState<ISector[]>([]);

	const fetchFreelancerSectors = useCallback(() => {
		getFreelancerPrimaryInfo(freelancerId)
			.then(data => setFreelancerSectors(data.sectors ?? []))
			.catch(console.error);
	}, [ freelancerId, getFreelancerPrimaryInfo ]);

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

	const renderSectors = (): React.ReactNode[] => {
			return freelancerSectors.map(sector => {
				return <div key={ sector.id } className={ styles['sectors__item'] }>
					{ sector.name }
				</div>
			});
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