import styles from "./FreelancerWorkExperience.module.scss";
import { NAVBAR_SECTIONS, NavbarSectionKey } from "@constants/freelancerInnerNavbarSections.ts";
import React, { useContext } from "react";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import AlertItem from "@ui/AlertItem/AlertItem.tsx";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import AddWorkExperienceModalItem
	from "@components/features/EditModal/work_experience/AddWorkExperienceModalItem/AddWorkExperienceModalItem.tsx";

const FreelancerWorkExperience = () => {

	const SECTION_ID: NavbarSectionKey = 'experience';

	const {openModal} = useModal();

	const {user} = useContext(AuthContext);

	if (!user) return null;

	const handleAddWorkExperience = () => {
		openModal({
			id: 'AddWorkExperienceModalItem',
			title: 'Dodaj doświadczenie',
			child: <AddWorkExperienceModalItem onSave={ () => {} }/>,
			shouldCloseOnSaving: false,
			withSaveBtn: true,
			btnWithIcon: true,
			btnText: 'Dodaj doświadczenie'
		});
	};

	const handleEditWorkExperience = () => {
		openModal({
			id: 'EditWorkExperienceModalItem',
			title: 'Edytuj doświadczenie',
			child: <></>,
			withSaveBtn: false
		});
	};

	const renderWorkExperience = () => {
		if (user?.workExperiences.length === 0) {
			return <AlertItem kind={'neutral'} text={'Nie uzupełniłeś/aś dane o doświadczeniu'}/>;
		}
	};

	return (
		<section id={SECTION_ID} className={styles['experience']}>
			<header className={ styles['experience__header'] }>
				<h2 className={ 'title title--profile' }>{ NAVBAR_SECTIONS[SECTION_ID] }</h2>
				<div className={ styles['experience__buttons'] }>
					<ActionBtn kind={ 'Add' }
					           key={ 'Add' }
					           withBorder={ true }
					           backgroundColor={ 'transparent' }
					           onClick={ handleAddWorkExperience }/>
					{ user?.workExperiences.length > 0 &&
                        <ActionBtn kind={ 'Edit' }
                                   key={ 'Edit' }
                                   withBorder={ true }
                                   backgroundColor={ 'transparent' }
                                   onClick={ handleEditWorkExperience }/>
					}
				</div>
			</header>
			<div className={ styles['experience__content'] }>
				{renderWorkExperience()}
			</div>
		</section>
	);
};

export default FreelancerWorkExperience;