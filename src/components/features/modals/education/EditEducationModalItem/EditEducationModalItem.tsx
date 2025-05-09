import { useModal } from "@context/ModalContext/ModalContext.ts";
import React, { useCallback, useEffect, useState } from "react";
import WorkExperienceEducationItem
	from "@components/features/freelancer-profile/common/WorkExperienceEducationItem/WorkExperienceEducationItem.tsx";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";
import styles from "./EditEducationModalItem.module.scss";
import { useFreelancerEducationService } from "@services/freelancer/freelancerEducationService.ts";
import { IFreelancerEducation, IFreelancerEducationRequest } from "@shared/freelancer/education.ts";
import { IEditEducationModalItemProps } from "./editEducationModalItemTypes.ts";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";
import AddEducationModalItem
	from "@components/features/modals/education/AddEducationModalItem/AddEducationModalItem.tsx";

const EditEducationModalItem: React.FC<IEditEducationModalItemProps> = ({ freelancerId, states }) => {

	const {
		getEducations,
		addEducation,
		patchEducation,
		deleteEducation,
		loadingStatus
	} = useFreelancerEducationService();
	const { openModal } = useModal();

	const [ educationItems, setEducationItems ] = useState<IFreelancerEducation[]>([]);

	const fetchEducation = useCallback(() => {
		getEducations(freelancerId)
			.then(setEducationItems)
			.catch(console.error);
	}, [ freelancerId, getEducations ]);

	useEffect(() => {
		fetchEducation();
	}, [ fetchEducation ]);

	const handleDeleteEducation = (id: number) => {
		deleteEducation(id)
			.then(fetchEducation)
			.catch(console.error);
	};

	const handleAddEducation = (request: IFreelancerEducationRequest) => {
		addEducation(request)
			.then(fetchEducation)
			.catch(console.error);
	};

	const handlePatchEducation = (id: number, request: IFreelancerEducationRequest) => {
		patchEducation(id, request)
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

	const onEducationEdit = (id: number, item: IFreelancerEducationRequest) => {
		openModal({
			id: 'EditEducationModalItem',
			title: 'Edytuj wykształcenie',
			child:
				<AddEducationModalItem onSave={ (request) => handlePatchEducation(id, request) }
				                       isEdit={ true }
				                       education={ item }/>,
			shouldCloseOnSaving: false,
			withSaveBtn: true,
			btnWithIcon: false,
			btnText: 'Edytuj wykształcenie'
		});
	};

	const renderItems = () => {
		return educationItems.map(item => {
			return <WorkExperienceEducationItem key={ item.id }
			                                    title={ item.nameOfEducation }
			                                    organization={ item.titleOfEducation }
			                                    itemType={ 'education' }
			                                    city={ item.localization.city }
			                                    state={ item.localization.state }
			                                    startDate={ item.startDate }
			                                    endDate={ item.endDate ?? undefined }
			                                    isModalItem={ true }
			                                    states={ states }
			                                    onEdit={ () => onEducationEdit(item.id, item) }
			                                    onDelete={ () => handleDeleteEducation(item.id) }/>;
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
			<button className={ `btn 
								 btn--tertiary 
								 ${ styles["modal__btn"] }` }
					onClick={ onEducationAdd }>
				<AddIcon/>
				<span>Dodaj doświadczenie</span>
			</button>
		</>
	);
}

export default EditEducationModalItem;