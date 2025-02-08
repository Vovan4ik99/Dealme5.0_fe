import styles from "./FreelancerServices.module.scss";
import { NAVBAR_SECTIONS, NavbarSectionKey } from "@constants/freelancerInnerNavbarSections.ts";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import React, { useContext, useEffect, useState } from "react";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { IActivity, IActivityRequest } from "@shared/onboardingTypes.ts";
import FreelancerProfileActivity
	from "@components/features/FreelancerProfile/main/FreelancerServices/FreelancerProfileActivity/FreelancerProfileActivity.tsx";
import AddActivityModalItem
	from "@components/features/EditModal/activities/AddActivityModalItem/AddActivityModalItem.tsx";
import { useOnboardingService } from "@services/onboardingService.ts";
import EdtActivitiesModalItem
	from "@components/features/EditModal/activities/EditActivitiesModalItem/EdtActivitiesModalItem.tsx";

const FreelancerServices = () => {

	const SECTION_ID: NavbarSectionKey = 'services';

	const { openModal } = useModal();
	const { user, getLoggedUserData } = useContext(AuthContext);
	const { getActivities, patchActivities } = useOnboardingService();
	
	const [ allActivities, setAllActivities ] = useState<IActivity[]>([]);
	
	useEffect(() => {
		getActivities()
			.then(setAllActivities)
			.catch(console.error);
	}, [getActivities]);

	if (!user) return null;

	const addNewActivity = (newActivity: IActivity, level: number) => {
		//TODO should be request to post new Activity
	};

	const editActivities = (request: IActivityRequest[]) => {
		patchActivities(request)
			.then(() => getLoggedUserData(localStorage.getItem('token')!))
			.catch(console.error);
	};
	
	const getActivitiesToAdd = () => {
		return  allActivities.filter(
			activity => !user.selectedActivities.some(a => a.activityId === activity.id)
		);
	};

	const onServiceAdd = () => {
		openModal({
			id: 'AddActivityModalItem',
			title: 'Dodaj usługę',
			shouldCloseOnSaving: true,
			withSaveBtn: true,
			child: <AddActivityModalItem onSave={ addNewActivity }
			                             activitiesToRender={ getActivitiesToAdd() }/>,
			btnWithIcon: true,
			btnText: 'Dodaj usługę'
		});
	};

	const onServiceEdit = () => {
		openModal({
			id: 'EditActivitiesModalItem',
			title: 'Edytuj usługi',
			shouldCloseOnSaving: true,
			withSaveBtn: true,
			child: <EdtActivitiesModalItem onSave={ editActivities }/>,
			btnWithIcon: false,
			btnText: 'Zapisz zmiany'
		});
	};

	const renderServices = () => {
		return user.selectedActivities.map(activity => {
			return <FreelancerProfileActivity key={ activity.activityId }
			                                  name={ activity.name }
			                                  level={ activity.level }
			                                  rating={ activity.points ?? 0 }
			                                  ordersCount={ activity.orderCount ?? 0 }/>
		});
	};

	return (
		<section className={ styles['service'] } id={ SECTION_ID }>
			<header className={ styles['service__header'] }>
				<h2 className={ 'title title--profile' }>{ NAVBAR_SECTIONS[SECTION_ID] }</h2>
				<div className={ styles['service__actions'] }>
					<ActionBtn kind={ 'Add' }
					           onClick={ onServiceAdd }
					           withBorder={ true }
					           backgroundColor={ 'transparent' }/>
					<ActionBtn kind={ 'Edit' }
					           onClick={ onServiceEdit }
					           withBorder={ true }
					           backgroundColor={ 'transparent' }/>
				</div>
			</header>
			<div className={ styles['service__content'] }>
				{ renderServices() }
			</div>
		</section>
	);
};

export default FreelancerServices;