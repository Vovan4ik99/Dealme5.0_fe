import { NAVBAR_SECTIONS, NavbarSectionKey } from "@constants/freelancerInnerNavbarSections.ts";
import styles from "./FreelancerEducation.module.scss";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import React, { useCallback, useContext, useEffect, useState } from "react";
import AlertItem from "@ui/AlertItem/AlertItem.tsx";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { useFreelancerEducationService } from "@services/freelancerEducationService.ts";
import { IFreelancerEducation, IFreelancerEducationRequest } from "@shared/freelancer/education.ts";
import WorkExperienceEducationItem
	from "@components/features/FreelancerProfile/common/WorkExperienceEducationItem/WorkExperienceEducationItem.tsx";
import { IFreelancerState } from "@shared/freelancer/localization.ts";
import { useFreelancerProfileAsideInfoService } from "@services/freelancerProfileAsideInfoService.ts";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import AddEducationModalItem
	from "@components/features/EditModal/education/AddEducationModalItem/AddEducationModalItem.tsx";
import EditEducationModalItem
	from "@components/features/EditModal/education/EditEducationModalItem/EditEducationModalItem.tsx";

const FreelancerEducation = () => {

	const SECTION_ID: NavbarSectionKey = "education";

	const {user} = useContext(AuthContext);
	const {getEducations, addEducation} = useFreelancerEducationService();
	const {getStates} = useFreelancerProfileAsideInfoService();
	const {openModal} = useModal();
	
	const [educationItems, setEducationItems] = useState<IFreelancerEducation[]>([]);
	const [states, setStates] = useState<IFreelancerState[]>([]);
	
	const fetchEducation = useCallback(() => {
		if (!user) return;
		getEducations(user.id)
			.then(setEducationItems)
			.catch(console.error);
	}, [getEducations, user]);

	useEffect(() => {
		fetchEducation();
	}, [fetchEducation]);

	useEffect(() => {
		getStates()
			.then(setStates)
			.catch(console.error);
	}, [getStates]);

	const handleAddEducation = (request: IFreelancerEducationRequest) => {
		addEducation(request)
			.then(fetchEducation)
			.catch(console.error);
	};

	const onEducationAdd = () => {
		openModal({
			id: "AddEducationModalItem",
			title: 'Dodaj wykształcenie',
			btnText: 'Dodaj wykształcenie',
			btnWithIcon: true,
			shouldCloseOnSaving: false,
			withSaveBtn: true,
			child: <AddEducationModalItem onSave={ handleAddEducation }/>
		});
	};

	const handleEditEducation = () => {
		if (!user) return;
		openModal({
			id: "EditEducationsModalItem",
			title: 'Edytuj wykształcenie',
			withSaveBtn: false,
			child: <EditEducationModalItem states={states} freelancerId={user?.id}/>,
			onClose: fetchEducation,
		});
	};

	const renderEducation = () => {
		if (educationItems.length === 0) {
			return <AlertItem kind={'neutral'} text={'Nie uzupełniłeś/aś dane o wykształceniu'}/>
		}
		return educationItems.map(education => {
			return <WorkExperienceEducationItem key={education.id}
			                                    title={education.nameOfEducation}
			                                    organization={education.titleOfEducation}
			                                    city={education.localization.city}
			                                    startDate={education.startDate}
			                                    endDate={education.endDate ?? undefined}
			                                    state={education.localization.state}
			                                    itemType={'education'}
			                                    isModalItem={false}
			                                    states={states}/>
		});
	};

	return (
		<section id={SECTION_ID} className={styles['education']}>
			<header className={ styles['education__header'] }>
				<h2 className={ 'title title--profile' }>{ NAVBAR_SECTIONS[SECTION_ID] }</h2>
				<div className={ styles['education__buttons'] }>
					<ActionBtn kind={ 'Add' }
					           key={ 'Add' }
					           withBorder={ true }
					           backgroundColor={ 'white' }
					           onClick={ onEducationAdd }/>
					{ educationItems.length > 0 &&
                        <ActionBtn kind={ 'Edit' }
                                   key={ 'Edit' }
                                   withBorder={ true }
                                   backgroundColor={ 'white' }
                                   onClick={ handleEditEducation }/>
					}
				</div>
			</header>
			<div className={ styles['education__content'] }>
				{renderEducation()}
			</div>
		</section>
	);
};

export default FreelancerEducation;