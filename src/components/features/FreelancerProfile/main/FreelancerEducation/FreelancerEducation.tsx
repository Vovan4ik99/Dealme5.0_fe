import { NAVBAR_SECTIONS, NavbarSectionKey } from "@constants/freelancerInnerNavbarSections.ts";
import styles from "./FreelancerEducation.module.scss";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import React, { useCallback, useEffect, useState } from "react";
import AlertItem from "@ui/AlertItem/AlertItem.tsx";
import { useFreelancerEducationService } from "@services/freelancer/freelancerEducationService.ts";
import { IFreelancerEducation, IFreelancerEducationRequest } from "@shared/freelancer/education.ts";
import WorkExperienceEducationItem
	from "@components/features/FreelancerProfile/common/WorkExperienceEducationItem/WorkExperienceEducationItem.tsx";
import { IFreelancerState } from "@shared/freelancer/localization.ts";
import { useFreelancerProfileAsideInfoService } from "@services/freelancer/freelancerProfileAsideInfoService.ts";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import AddEducationModalItem
	from "@components/features/EditModal/education/AddEducationModalItem/AddEducationModalItem.tsx";
import EditEducationModalItem
	from "@components/features/EditModal/education/EditEducationModalItem/EditEducationModalItem.tsx";
import {
	IFreelancerEducationProps
} from "@components/features/FreelancerProfile/main/FreelancerEducation/freelancerEducationTypes.ts";

const FreelancerEducation: React.FC<IFreelancerEducationProps> = ({ isLoggedUserProfile, freelancerId }) => {

	const SECTION_ID: NavbarSectionKey = "education";

	const { getEducations, addEducation } = useFreelancerEducationService();
	const { getStates } = useFreelancerProfileAsideInfoService();
	const { openModal } = useModal();

	const [ educationItems, setEducationItems ] = useState<IFreelancerEducation[]>([]);
	const [ states, setStates ] = useState<IFreelancerState[]>([]);

	const fetchEducation = useCallback(() => {
		getEducations(freelancerId)
			.then(setEducationItems)
			.catch(console.error);
	}, [ freelancerId, getEducations ]);

	useEffect(() => {
		fetchEducation();
	}, [ fetchEducation ]);

	useEffect(() => {
		getStates()
			.then(setStates)
			.catch(console.error);
	}, [ getStates ]);

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
		openModal({
			id: "EditEducationsModalItem",
			title: 'Edytuj wykształcenie',
			withSaveBtn: false,
			child: <EditEducationModalItem states={ states } freelancerId={ freelancerId }/>,
			onClose: fetchEducation,
		});
	};

	const renderEducation = () => {
		if (educationItems.length === 0) {
			const text = isLoggedUserProfile ?
				'Nie uzupełniłeś/aś dane o wykształceniu' :
				'Brak danych o wykształceniu';

			return <AlertItem kind={ 'neutral' } text={ text }/>
		}
		return educationItems.map(education => {
			return <WorkExperienceEducationItem key={ education.id }
			                                    title={ education.nameOfEducation }
			                                    organization={ education.titleOfEducation }
			                                    city={ education.localization.city }
			                                    startDate={ education.startDate }
			                                    endDate={ education.endDate ?? undefined }
			                                    state={ education.localization.state }
			                                    itemType={ 'education' }
			                                    isModalItem={ false }
			                                    states={ states }/>
		});
	};

	return (
		<section id={ SECTION_ID } className={ styles['education'] }>
			<header className={ styles['education__header'] }>
				<h2 className={ 'title title--profile' }>{ NAVBAR_SECTIONS[SECTION_ID] }</h2>
				{ isLoggedUserProfile &&
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
				}
			</header>
			<div className={ styles['education__content'] }>
				{ renderEducation() }
			</div>
		</section>
	);
};

export default FreelancerEducation;