import React, {useCallback, useEffect, useState} from "react";
import {
	IWorkingHoursProfileItemProps
} from "@components/features/FreelancerProfile/SecondaryInfo/WorkingHoursProfileItem/workingHoursProfileItemTypes.ts";
import {useOnboardingService} from "@services/onboardingService.ts";
import clock from "@icons/freelancer_profile/secondary_info/clock.svg";
import styles from "@components/features/FreelancerProfile/SecondaryInfo/SecondaryInfo.module.scss";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import WorkingHoursModalItem from "@components/features/EditModal/working_hours/WorkingHoursModalItem/WorkingHoursModalItem.tsx";

const WorkingHoursProfileItem: React.FC<IWorkingHoursProfileItemProps> = ({userWorkingHour, onSave}) => {
	
	const {getWorkingHours, patchWorkingHours, loadingStatus} = useOnboardingService();
	const {openModal} = useModal();
	
	const [workingHourDescription, setWorkingHourDescription] = useState<string>('');

	useEffect(() => {
		getWorkingHours()
			.then(response => {
				setWorkingHourDescription(
					response.find(hour => hour.workingHour === userWorkingHour)?.description ?? ''
				);
			}).catch(console.error);
	}, [getWorkingHours, userWorkingHour, workingHourDescription]);

	const handleSave= useCallback((selectedWorkingHour: string) => {
		patchWorkingHours(selectedWorkingHour)
			.then(onSave)
			.catch(console.error);
	}, [onSave, patchWorkingHours]);

	const onEdit = () => {
		openModal({
			id: 'workingHoursEdit',
			title: "Edytuj dyspozycyjność czasową",
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			shouldCloseOnSaving: true,
			child: <WorkingHoursModalItem userWorkingHour={userWorkingHour} onSave={handleSave}/>
		});
	}
	
	if (loadingStatus === 'loading') {
		return <LoadingSpinner />;
	}
	
	return (
		<>
			<div className={styles['info__icon']}>
				<img src={clock} alt="clock"/>
			</div>
			<p>{workingHourDescription} / tydzień</p>
			<div className={styles['info__btn']}>
				<ActionBtn kind={'Edit'}
				           withBorder={false}
				           backgroundColor={'transparent'}
				           onClick={onEdit}/>
			</div>
		</>
	)
};

export default WorkingHoursProfileItem;