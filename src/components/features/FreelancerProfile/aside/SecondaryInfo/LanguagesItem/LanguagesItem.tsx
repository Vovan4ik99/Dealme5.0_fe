import React from "react";
import {
	ILanguagesItemProps
} from "@components/features/FreelancerProfile/aside/SecondaryInfo/LanguagesItem/languagesItemTypes.ts";
import styles from "@components/features/FreelancerProfile/aside/SecondaryInfo/SecondaryInfo.module.scss";
import languages_img from "@icons/freelancer_profile/secondary_info/language.svg";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import LanguagesModalItem from "@components/features/EditModal/language/LanguagesModalItem/LanguagesModalItem.tsx";
import {getPolishLanguageName} from "@utils/languageUtils.ts";

const LanguagesItem: React.FC<ILanguagesItemProps> = ({isUndefined, freelancerLanguages, onSave}) => {

	const {openModal} = useModal();

	const getFreelancerLanguages = () => {
		if (isUndefined) {
			return 'Nie podano znajomości języków';
		}
		return freelancerLanguages
			.map(language => getPolishLanguageName(language))
			.join(', ');
	};

	const onEdit = () => {
		openModal({
			id: "unknown",
			title: "Edytuj znajomość języków",
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			shouldCloseOnSaving: true,
			child: <LanguagesModalItem onSave={onSave}/>
		})
	};

	return (
		<>
			<div className={`${styles['info__icon']} ${styles['info__icon']}`}>
				<img src={languages_img} alt="language"/>
			</div>
			<p>{getFreelancerLanguages()}</p>
			<div className={styles['info__btn']}>
				<ActionBtn kind={'Edit'}
				           withBorder={false}
				           backgroundColor={'transparent'}
				           onClick={onEdit}/>
			</div>
		</>
	)
}

export default LanguagesItem;