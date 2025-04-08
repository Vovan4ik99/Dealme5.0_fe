import React, { useEffect, useState } from "react";
import {
	ILocalizationItemProps
} from "@components/features/freelancer-profile/aside/SecondaryInfo/LocalizationItem/localizationItemTypes.ts";
import styles from "@components/features/freelancer-profile/aside/SecondaryInfo/SecondaryInfo.module.scss";
import localization_img from "@icons/freelancer_profile/secondary_info/localization.svg";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import LocalizationModalItem
	from "@components/features/modals/localization/LocalizationModalItem/LocalizationModalItem.tsx";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";
import { getDescriptionByCountryName, getStateDescriptionByStateName } from "@utils/localizationUtils.ts";
import { useFreelancerProfileAsideInfoService } from "@services/freelancer/freelancerProfileAsideInfoService.ts";
import { IFreelancerCountry, IFreelancerState } from "@shared/freelancer/localization.ts";

const LocalizationItem: React.FC<ILocalizationItemProps> = ({
	                                                            userLocalization,
	                                                            freelancerWorkingAreaValue,
	                                                            freelancerWorkingArea,
	                                                            onSave,
	                                                            isUndefined,
	                                                            isLoggedUserProfile
                                                            }) => {

	const { getStates, getCountries, loadingStatus } = useFreelancerProfileAsideInfoService();
	const { openModal } = useModal();

	const [ states, setStates ] = useState<IFreelancerState[]>([]);
	const [ countries, setCountries ] = useState<IFreelancerCountry[]>([]);

	useEffect(() => {
		getStates()
			.then(setStates)
			.catch(console.error);
	}, [ getStates ]);

	useEffect(() => {
		getCountries()
			.then(setCountries)
			.catch(console.error);
	}, [ getCountries ]);

	const onEdit = () => {
		openModal({
			id: 'LocalizationModalItem',
			title: 'Edytuj lokalizację i obszar świadczenia usług',
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			shouldCloseOnSaving: false,
			withSaveBtn: true,
			child: <LocalizationModalItem freelancerWorkingArea={ freelancerWorkingArea }
			                              freelancerWorkingAreaValue={ freelancerWorkingAreaValue }
			                              userLocalization={ userLocalization }
			                              onSave={ onSave }/>
		});
	};

	const getUserLocalization = () => {
		if (isUndefined || !userLocalization) {
			return 'Nie podano lokalizacji';
		}
		const userState = `${ getStateDescriptionByStateName(states, userLocalization?.state ?? null) }`;
		if (!userLocalization.city) {
			return `${ getDescriptionByCountryName(countries, userLocalization.country) }, ${ userState }`;
		}
		return `${ userLocalization?.city }, ${ userState }`;
	};

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<>
			<div className={ `${ styles['info__icon'] } ${ styles['info__icon--h14'] }` }>
				<img src={ localization_img } alt="localization"/>
			</div>
			<p>{ getUserLocalization() }</p>
			{ isLoggedUserProfile &&
                <div className={ styles['info__btn'] }>
                    <ActionBtn kind={ 'Edit' }
                               withBorder={ false }
                               backgroundColor={ 'transparent' }
                               onClick={ onEdit }/>
                </div>
			}
		</>
	);
};

export default LocalizationItem;