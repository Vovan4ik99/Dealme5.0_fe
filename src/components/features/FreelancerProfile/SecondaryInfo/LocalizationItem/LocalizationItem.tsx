import React, {useEffect, useState} from "react";
import {
	ILocalizationItemProps
} from "@components/features/FreelancerProfile/SecondaryInfo/LocalizationItem/localizationItemTypes.ts";
import styles from "@components/features/FreelancerProfile/SecondaryInfo/SecondaryInfo.module.scss";
import localization_img from "@icons/freelancer_profile/secondary_info/localization.svg";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import LocalizationModalItem from "@components/features/EditModal/LocalizationModalItem/LocalizationModalItem.tsx";
import {useFreelancerProfileService} from "@services/freelancerProfileService.ts";
import {IFreelancerState} from "@shared/freelancerTypes.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import {getStateDescriptionByStateName} from "@utils/localizationUtils.ts";

const LocalizationItem: React.FC<ILocalizationItemProps> = ({
	                                                            userLocalization,
	                                                            freelancerWorkingAreaValue,
	                                                            freelancerWorkingArea,
	                                                            onSave,
	                                                            isUndefined
                                                            }) => {

	const {getStates, loadingStatus} = useFreelancerProfileService();
	const [states, setStates] = useState<IFreelancerState[]>([]);
	const {openModal} = useModal();

	useEffect(() => {
		getStates()
			.then(setStates)
			.catch(console.error);
	}, [getStates]);

	const onEdit = () => {
		openModal({
			id: 'localizationEdit',
			title: 'Edytuj lokalizację i obszar świadczenia usług',
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			shouldCloseOnSaving: true,
			child: <LocalizationModalItem freelancerWorkingArea={freelancerWorkingArea}
			                              freelancerWorkingAreaValue={freelancerWorkingAreaValue}
			                              userLocalization={userLocalization}
			                              onSave={onSave}/>
		});
	};

	const getUserLocalization = () => {
		if (isUndefined) {
			return 'Nie podano lokalizacji';
		}
		return `${userLocalization?.city}, ${getStateDescriptionByStateName(states, userLocalization?.state ?? null)}`;
	};

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<>
			<div className={`${styles['info__icon']} ${styles['info__icon--h14']}`}>
				<img src={localization_img} alt="localization"/>
			</div>
			<p>{getUserLocalization()}</p>
			<div className={styles['info__btn']}>
				<ActionBtn kind={'Edit'}
				           withBorder={false}
				           backgroundColor={'transparent'}
				           onClick={onEdit}/>
			</div>
		</>
	);
};

export default LocalizationItem;