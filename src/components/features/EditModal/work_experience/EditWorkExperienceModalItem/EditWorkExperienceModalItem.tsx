import styles from './EditWorkExperienceModalItem.module.scss';
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";
import { useFreelancerWorkExperienceService } from "@services/freelancerWorkExperienceService.ts";
import React, { useCallback, useEffect, useState } from "react";
import WorkExperienceEducationItem
	from "@components/features/FreelancerProfile/common/WorkExperienceEducationItem/WorkExperienceEducationItem.tsx";
import {
	IEditWorkExperienceModalItemProps
} from "@components/features/EditModal/work_experience/EditWorkExperienceModalItem/editWorkExperienceModalItemTypes.ts";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import AddWorkExperienceModalItem
	from "@components/features/EditModal/work_experience/AddWorkExperienceModalItem/AddWorkExperienceModalItem.tsx";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import { IFreelancerWorkExperience, IFreelancerWorkExperienceRequest } from "@shared/freelancer/work-experience.ts";

const EditWorkExperienceModalItem: React.FC<IEditWorkExperienceModalItemProps> = ({ freelancerId, states }) => {

	const {
		getFreelancerWorkExperience,
		addWorkExperience,
		patchWorkExperience,
		deleteWorkExperience,
		loadingStatus
	} = useFreelancerWorkExperienceService();
	const { openModal } = useModal();

	const [ workExperienceItems, setWorkExperienceItems ] = useState<IFreelancerWorkExperience[]>([]);

	const fetchWorkExperience = useCallback(() => {
		getFreelancerWorkExperience(freelancerId)
			.then(setWorkExperienceItems)
			.catch(console.error);
	}, [ freelancerId, getFreelancerWorkExperience ]);

	useEffect(() => {
		fetchWorkExperience();
	}, [ fetchWorkExperience ]);

	const handleDeleteWorkExperience = (id: number) => {
		deleteWorkExperience(id)
			.then(fetchWorkExperience)
			.catch(console.error);
	};

	const handleAddWorkExperience = (request: IFreelancerWorkExperienceRequest) => {
		addWorkExperience(request)
			.then(fetchWorkExperience)
			.catch(console.error);
	};

	const handlePatchWorkExperience = (id: number, request: IFreelancerWorkExperienceRequest) => {
		patchWorkExperience(id, request)
			.then(fetchWorkExperience)
			.catch(console.error);
	};

	const onWorkExperienceAdd = () => {
		openModal({
			id: 'AddWorkExperienceModalItem',
			title: 'Dodaj doświadczenie',
			child: <AddWorkExperienceModalItem onSave={ handleAddWorkExperience }/>,
			shouldCloseOnSaving: false,
			withSaveBtn: true,
			btnWithIcon: true,
			btnText: 'Dodaj doświadczenie'
		});
	};

	const onWorkExperienceEdit = (id: number, item: IFreelancerWorkExperience) => {
		openModal({
			id: 'EditWorkExperienceModalItem',
			title: 'Edytuj doświadczenie',
			child:
				<AddWorkExperienceModalItem onSave={ (request) => handlePatchWorkExperience(id, request) }
				                            isEdit={ true }
				                            workExperience={ item }/>,
			shouldCloseOnSaving: false,
			withSaveBtn: true,
			btnWithIcon: false,
			btnText: 'Edytuj doświadczenie'
		});
	};

	const renderItems = () => {
		return workExperienceItems.map(item => {
			return <WorkExperienceEducationItem key={ item.id }
			                                    title={item.jobTitle}
			                                    organization={item.companyName}
			                                    itemType={'workExperience'}
			                                    city={item.city}
			                                    state={item.state}
			                                    startDate={item.startDate}
			                                    endDate={item.endDate ?? undefined}
			                                    isModalItem={ true }
			                                    states={ states }
			                                    onEdit={ () => onWorkExperienceEdit(item.id, item) }
			                                    onDelete={ () => handleDeleteWorkExperience(item.id) }/>;
		});
	};

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<>
			<div className={ styles['modal'] }>
				{ renderItems() }
			</div>
			<button className={ 'btn btn--modal' } onClick={ onWorkExperienceAdd }>
				<AddIcon/>
				<span>Dodaj doświadczenie</span>
			</button>
		</>
	);
}

export default EditWorkExperienceModalItem;