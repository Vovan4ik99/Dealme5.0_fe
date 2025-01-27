import React, {useEffect, useState} from "react";
import {
	ILocalizationItemProps
} from "@components/features/FreelancerProfile/SecondaryInfo/LocalizationItem/localizationItemTypes.ts";
import styles from "@components/features/FreelancerProfile/SecondaryInfo/SecondaryInfo.module.scss";
import localization_img from "@icons/freelancer_profile/secondary_info/localization.svg";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import LocalizationModalItem
	from "@components/features/EditModal/localization/LocalizationModalItem/LocalizationModalItem.tsx";
import {IFreelancerCountry, IFreelancerState} from "@shared/freelancerTypes.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import {getDescriptionByCountryName, getStateDescriptionByStateName} from "@utils/localizationUtils.ts";
import {useFreelancerProfileAsideInfoService} from "@services/freelancerProfileAsideInfoService.ts";

const LocalizationItem: React.FC<ILocalizationItemProps> = ({
	                                                            userLocalization,
	                                                            freelancerWorkingAreaValue,
	                                                            freelancerWorkingArea,
	                                                            onSave,
	                                                            isUndefined
                                                            }) => {

	const {getStates, getCountries, loadingStatus} = useFreelancerProfileAsideInfoService();
	const {openModal} = useModal();

	const [states, setStates] = useState<IFreelancerState[]>([]);
	const [countries, setCountries] = useState<IFreelancerCountry[]>([]);

	useEffect(() => {
		getStates()
			.then(setStates)
			.catch(console.error);
	}, [getStates]);

	useEffect(() => {
		getCountries()
			.then(setCountries)
			.catch(console.error);
	}, [getCountries]);

	const onEdit = () => {
		openModal({
			id: 'unknown',
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
		if (isUndefined || !userLocalization) {
			return 'Nie podano lokalizacji';
		}
		const userState = `${getStateDescriptionByStateName(states, userLocalization?.state ?? null)}`;
		if (!userLocalization.city) {
			return `${getDescriptionByCountryName(countries, userLocalization.country)}, ${userState}`;
		}
		return `${userLocalization?.city}, ${userState}`;
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