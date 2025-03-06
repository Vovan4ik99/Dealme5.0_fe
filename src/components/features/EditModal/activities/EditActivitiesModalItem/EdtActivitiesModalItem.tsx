import styles from './EdtActivitiesModalItem.module.scss';
import DragAndDropContainer
	from "@components/features/EditModal/dragging/DragAndDropContainer/DragAndDropContainer.tsx";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import AddActivityModalItem
	from "@components/features/EditModal/activities/AddActivityModalItem/AddActivityModalItem.tsx";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { IActivity } from "@shared/onboardingTypes.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import {
	IDraggableActivity,
	IEditActivitiesModalItemProps
} from "@components/features/EditModal/activities/EditActivitiesModalItem/edtActivitiesModalItemTypes.ts";
import ActivityModalItem from "@components/features/EditModal/activities/ActivityModalItem/ActivityModalItem.tsx";
import { useFreelancerProfileService } from "@services/freelancer/freelancerProfileService.ts";

const EdtActivitiesModalItem: React.FC<IEditActivitiesModalItemProps> = ({ registerOnSave, onSave }) => {

	const { openModal } = useModal();
	const { getActivities } = useFreelancerOnboardingService();
	const { getFreelancerActivities } = useFreelancerProfileService();

	const { user } = useContext(AuthContext);

	const [ draggableActivities, setDraggableActivities ] = useState<IDraggableActivity[]>([]);
	const [ allActivities, setAllActivities ] = useState<IActivity[]>([]);

	useEffect(() => {
		if (!user) return;

		const mappedActivities: IDraggableActivity[] = [];

		getFreelancerActivities(user.id)
			.then(response => {
				response.forEach(activity => mappedActivities.push({
					id: activity.activityId,
					...activity,
				}))
				setDraggableActivities(mappedActivities);
			})
			.catch(console.error);
	}, [ getFreelancerActivities, user ]);

	useEffect(() => {
		if (!user) return;
		getActivities()
			.then(setAllActivities)
			.catch(console.error);
	}, [ getActivities, user ]);

	const getActivitiesToAdd = () => {
		return allActivities.filter(activity => !draggableActivities
			.some(a => a.activityId === activity.id));
	};

	const addNewActivity = (newActivity: IActivity, level: number) => {
		setDraggableActivities(prevState => {
			const activityToAdd: IDraggableActivity = {
				id: newActivity.id,
				activityId: newActivity.id,
				name: newActivity.name,
				level,
				points: null,
				orderCount: null
			};

			return [ ...prevState, activityToAdd ];
		});
	};

	const onAddNewActivity = () => {
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

	const handleDeleteActivity = (activityId: number) => {
		setDraggableActivities(prevState => {
			return prevState.filter(activity => activity.activityId !== activityId);
		});
	};

	const handleUpdateActivityLevel = (activityId: number, level: number) => {
		setDraggableActivities(prevState => {
			return prevState.map(activity => {
				if (activity.activityId === activityId) {
					return { ...activity, level };
				}
				return activity;
			});
		});
	};

	const renderActivityItem = (activity: IDraggableActivity) => {
		return <ActivityModalItem key={ activity.activityId }
		                          level={ activity.level }
		                          name={ activity.name }
		                          onDelete={ () => handleDeleteActivity(activity.activityId) }
		                          onLevelUpdate={ (level) => handleUpdateActivityLevel(activity.activityId, level) }/>
	};

	const onActivitiesChange = (activities: typeof draggableActivities) => {
		setDraggableActivities(activities);
	};

	const handleSave = useCallback(() => {
		const requestActivities = draggableActivities.map(activity => ({
			activityId: activity.activityId,
			level: activity.level,
		}))
		onSave(requestActivities);
	}, [ onSave, draggableActivities ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	return (
		<div className={ styles['modal'] }>
			<div className={ styles['modal__items'] }>
				<DragAndDropContainer items={ draggableActivities }
				                      renderItem={ renderActivityItem }
				                      onItemsChange={ onActivitiesChange }/>
			</div>
			<button className={ 'btn btn--modal' } onClick={ onAddNewActivity }>
				<AddIcon/>
				<span>Dodaj kolejną usługę</span>
			</button>
		</div>
	);
}

export default EdtActivitiesModalItem;