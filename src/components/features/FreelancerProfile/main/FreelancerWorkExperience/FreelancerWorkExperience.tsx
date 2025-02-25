import styles from "./FreelancerWorkExperience.module.scss";
import { NAVBAR_SECTIONS, NavbarSectionKey } from "@constants/freelancerInnerNavbarSections.ts";
import React, { useCallback, useEffect, useState } from "react";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import AlertItem from "@ui/AlertItem/AlertItem.tsx";
import AddWorkExperienceModalItem
	from "@components/features/EditModal/work_experience/AddWorkExperienceModalItem/AddWorkExperienceModalItem.tsx";
import { useFreelancerWorkExperienceService } from "@services/freelancer/freelancerWorkExperienceService.ts";
import WorkExperienceEducationItem
	from "@components/features/FreelancerProfile/common/WorkExperienceEducationItem/WorkExperienceEducationItem.tsx";
import { useFreelancerProfileAsideInfoService } from "@services/freelancer/freelancerProfileAsideInfoService.ts";
import EditWorkExperienceModalItem
	from "@components/features/EditModal/work_experience/EditWorkExperienceModalItem/EditWorkExperienceModalItem.tsx";
import { IFreelancerState } from "@shared/freelancer/localization.ts";
import { IFreelancerWorkExperience, IFreelancerWorkExperienceRequest } from "@shared/freelancer/work-experience.ts";
import {
	IFreelancerWorkExperienceProps
} from "@components/features/FreelancerProfile/main/FreelancerWorkExperience/freelancerWorkExperienceTypes.ts";

const FreelancerWorkExperience: React.FC<IFreelancerWorkExperienceProps> = ({ isLoggedUserProfile, freelancerId }) => {

	const SECTION_ID: NavbarSectionKey = 'experience';

	const { openModal } = useModal();
	const { addWorkExperience, getFreelancerWorkExperience } = useFreelancerWorkExperienceService();
	const { getStates } = useFreelancerProfileAsideInfoService();

	const [ workExperienceItems, setWorkExperienceItems ] = useState<IFreelancerWorkExperience[]>([]);
	const [ states, setStates ] = useState<IFreelancerState[]>([]);

	useEffect(() => {
		getStates()
			.then(setStates)
			.catch(console.error);
	}, [ getStates ]);

	const fetchWorkExperience = useCallback(() => {
		getFreelancerWorkExperience(freelancerId)
			.then(setWorkExperienceItems)
			.catch(console.error);
	}, [ freelancerId, getFreelancerWorkExperience ]);

	useEffect(() => {
		fetchWorkExperience();
	}, [ fetchWorkExperience ]);

	const onWorkExperienceAdd = (request: IFreelancerWorkExperienceRequest) => {
		addWorkExperience(request)
			.then(fetchWorkExperience)
			.catch(console.error);
	};

	const handleAddWorkExperience = () => {
		openModal({
			id: 'AddWorkExperienceModalItem',
			title: 'Dodaj doświadczenie',
			child: <AddWorkExperienceModalItem onSave={ onWorkExperienceAdd }/>,
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
			child: <EditWorkExperienceModalItem states={ states } freelancerId={ freelancerId }/>,
			withSaveBtn: false,
			onClose: fetchWorkExperience,
		});
	};

	const renderWorkExperience = () => {
		if (workExperienceItems.length === 0) {
			const text = isLoggedUserProfile ?
				'Nie uzupełniłeś/aś dane o doświadczeniu' :
				'Brak danych o doświadczeniu';

			return <AlertItem kind={ 'neutral' } text={ text }/>;
		}
		return workExperienceItems.map(workExperience => {
			return <WorkExperienceEducationItem key={ workExperience.id }
			                                    title={ workExperience.jobTitle }
			                                    itemType={ 'workExperience' }
			                                    organization={ workExperience.companyName }
			                                    startDate={ workExperience.startDate }
			                                    endDate={ workExperience.endDate ?? undefined }
			                                    state={ workExperience.state }
			                                    city={ workExperience.city }
			                                    isModalItem={ false }
			                                    states={ states }/>;
		});
	};

	return (
		<section id={ SECTION_ID } className={ styles['experience'] }>
			<header className={ styles['experience__header'] }>
				<h2 className={ 'title title--profile' }>{ NAVBAR_SECTIONS[SECTION_ID] }</h2>
				{ isLoggedUserProfile &&
                    <div className={ styles['experience__buttons'] }>
                        <ActionBtn kind={ 'Add' }
                                   key={ 'Add' }
                                   withBorder={ true }
                                   backgroundColor={ 'white' }
                                   onClick={ handleAddWorkExperience }/>
						{ workExperienceItems.length > 0 &&
                            <ActionBtn kind={ 'Edit' }
                                       key={ 'Edit' }
                                       withBorder={ true }
                                       backgroundColor={ 'white' }
                                       onClick={ handleEditWorkExperience }/>
						}
                    </div>
				}
			</header>
			<div className={ styles['experience__content'] }>
				{ renderWorkExperience() }
			</div>
		</section>
	);
};

export default FreelancerWorkExperience;