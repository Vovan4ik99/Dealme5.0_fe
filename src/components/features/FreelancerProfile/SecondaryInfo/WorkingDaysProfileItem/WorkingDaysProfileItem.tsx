import calendar from '@icons/freelancer_profile/secondary_info/calendar.svg';
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import React from "react";
import styles from "@components/features/FreelancerProfile/SecondaryInfo/SecondaryInfo.module.scss";
import {
	IWorkingDaysProfileItemProps
} from "@components/features/FreelancerProfile/SecondaryInfo/WorkingDaysProfileItem/workingDaysProfileItemTypes.ts";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import {WORKING_DAYS, WorkingDayKey} from "@constants/workingDays.ts";
import {useOnboardingService} from "@services/onboardingService.ts";
import WorkingDaysModalItem from "@components/features/EditModal/WorkingDaysModalItem/WorkingDaysModalItem.tsx";

const WorkingDaysProfileItem: React.FC<IWorkingDaysProfileItemProps> = ({userWorkingDays, onSave}) => {

	const {openModal} = useModal();
	const {patchWorkingDays} = useOnboardingService();

	const formatWorkingDays = (): string => {
		const allDays = Object.keys(WORKING_DAYS) as WorkingDayKey[];
		const workDays: WorkingDayKey[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

		const isAllDays = userWorkingDays.length === allDays.length;
		if (isAllDays) {
			return "Wszystkie dni tygodnia";
		}

		const isWorkDays = userWorkingDays.length === workDays.length &&
			workDays.every(day => userWorkingDays.includes(day));
		if (isWorkDays) {
			return "Dni robocze";
		}

		const sortedDays = [...userWorkingDays].sort(
			(a, b) =>
				allDays.indexOf(a) - allDays.indexOf(b)
		);

		const ranges: string[] = [];
		let startDay = sortedDays[0];
		let prevDayIndex = allDays.indexOf(startDay);

		for (let i = 1; i <= sortedDays.length; i++) {
			const currentDay = sortedDays[i];
			const currentDayIndex = allDays.indexOf(currentDay);

			if (i === sortedDays.length || currentDayIndex !== prevDayIndex + 1) {
				const startDayName = WORKING_DAYS[startDay];
				const endDayName = WORKING_DAYS[sortedDays[i - 1]];

				if (startDay === sortedDays[i - 1]) {
					ranges.push(startDayName);
				} else {
					ranges.push(`${startDayName} - ${endDayName}`);
				}
				startDay = currentDay;
			}

			prevDayIndex = currentDayIndex;
		}
		return ranges.join(', ');
	};

	const handleSave = (newWorkingDays: WorkingDayKey[]) => {
		patchWorkingDays(newWorkingDays)
			.then(() => onSave())
			.catch(error => console.error(error));
	};

	const editWorkingDays = () => {
		openModal({
			id: 'workingDaysEdit',
			title: 'Edytuj dostępność',
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			shouldCloseOnSaving: true,
			child: <WorkingDaysModalItem userWorkingDays={userWorkingDays} onSave={handleSave}/>
		});
	};

	return (
		<>
			<div className={styles['info__icon']}>
				<img src={calendar} alt="calendar"/>
			</div>
			<p>{formatWorkingDays()}</p>
			<div className={styles['info__btn']}>
				<ActionBtn kind={'Edit'}
				           withBorder={false}
				           backgroundColor={'transparent'}
				           onClick={editWorkingDays}/>
			</div>
		</>
	);
}

export default WorkingDaysProfileItem;