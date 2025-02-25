import styles from "./FreelancerServices.module.scss";
import { NAVBAR_SECTIONS, NavbarSectionKey } from "@constants/freelancerInnerNavbarSections.ts";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import React, { useCallback, useEffect, useState } from "react";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import { IActivity, IActivityRequest, IFreelancerActivity } from "@shared/onboardingTypes.ts";
import FreelancerProfileActivity
	from "@components/features/FreelancerProfile/main/FreelancerServices/FreelancerProfileActivity/FreelancerProfileActivity.tsx";
import AddActivityModalItem
	from "@components/features/EditModal/activities/AddActivityModalItem/AddActivityModalItem.tsx";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import EdtActivitiesModalItem
	from "@components/features/EditModal/activities/EditActivitiesModalItem/EdtActivitiesModalItem.tsx";
import {
	IFreelancerServicesProps
} from "@components/features/FreelancerProfile/main/FreelancerServices/freelancerServicesTypes.ts";
import { useFreelancerProfileService } from "@services/freelancer/freelancerProfileService.ts";

const FreelancerServices: React.FC<IFreelancerServicesProps> = ({ freelancerId, isLoggedUserProfile }) => {

	const SECTION_ID: NavbarSectionKey = 'services';

	const { openModal } = useModal();
	const { getActivities, patchActivities } = useFreelancerOnboardingService();
	const { getFreelancerActivities } = useFreelancerProfileService()

	const [ allActivities, setAllActivities ] = useState<IActivity[]>([]);
	const [ freelancerActivities, setFreelancerActivities ] = useState<IFreelancerActivity[]>([]);

	useEffect(() => {
		getActivities()
			.then(setAllActivities)
			.catch(console.error);
	}, [ getActivities ]);

	const fetchFreelancerActivities = useCallback(() => {
		getFreelancerActivities(freelancerId)
			.then(setFreelancerActivities)
			.catch(console.error);
	}, [ freelancerId, getFreelancerActivities ]);

	useEffect(() => {
		fetchFreelancerActivities();
	}, [ fetchFreelancerActivities ]);

	const addNewActivity = (newActivity: IActivity, level: number) => {
		//TODO should be request to post new Activity
	};

	const editActivities = (request: IActivityRequest[]) => {
		patchActivities(request)
			.then(() => fetchFreelancerActivities())
			.catch(console.error);
	};

	const getActivitiesToAdd = () => {
		return allActivities.filter(
			activity => freelancerActivities.some(a => a.activityId === activity.id)
		);
	};

	const onServiceAdd = () => {
		openModal({
			id: 'AddActivityModalItem',
			title: 'Dodaj usługę',
			shouldCloseOnSaving: false,
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
		return freelancerActivities.map(activity => {
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
				{ isLoggedUserProfile &&
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
				}
			</header>
			<div className={ styles['service__content'] }>
				{ renderServices() }
			</div>
		</section>
	);
};

export default FreelancerServices;