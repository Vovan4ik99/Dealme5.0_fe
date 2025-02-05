import styles from "./FreelancerServices.module.scss";
import { NAVBAR_SECTIONS, NavbarSectionKey } from "@constants/freelancerInnerNavbarSections.ts";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import React, { useContext, useState } from "react";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { IFreelancerActivity } from "@shared/onboardingTypes.ts";
import FreelancerProfileActivity
	from "@components/features/FreelancerProfile/main/FreelancerServices/FreelancerProfileActivity/FreelancerProfileActivity.tsx";

const FreelancerServices = () => {

	const SECTION_ID: NavbarSectionKey = 'services';

	const {openModal} = useModal();
	const {user, getLoggedUserData} = useContext(AuthContext);

	const [activities, setActivities] = useState<IFreelancerActivity[]>(user?.selectedActivities ?? []);

	const onServiceAdd = () => {

	};

	const onServiceEdit = () => {

	};

	const renderServices = () => {
		return activities.map(activity => {
			return <FreelancerProfileActivity key={activity.activityId}
			                                  name={activity.name}
			                                  level={activity.level}
			                                  rating={0}
			                                  ordersCount={0}/>
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
				{renderServices()}
			</div>
		</section>
	);
};

export default FreelancerServices;