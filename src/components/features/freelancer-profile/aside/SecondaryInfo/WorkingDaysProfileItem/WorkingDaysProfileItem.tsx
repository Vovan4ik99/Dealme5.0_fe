import calendar from '@icons/freelancer_profile/secondary_info/calendar.svg';
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import React from "react";
import styles from "@components/features/freelancer-profile/aside/SecondaryInfo/SecondaryInfo.module.scss";
import {
	IWorkingDaysProfileItemProps
} from "@components/features/freelancer-profile/aside/SecondaryInfo/WorkingDaysProfileItem/workingDaysProfileItemTypes.ts";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import { WORKING_DAYS, WorkingDayKey } from "@constants/onboarding/workingDays.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import WorkingDaysModalItem
	from "@components/features/modals/working_days/WorkingDaysModalItem/WorkingDaysModalItem.tsx";

const WorkingDaysProfileItem: React.FC<IWorkingDaysProfileItemProps> = ({
	                                                                        userWorkingDays,
	                                                                        onSave,
	                                                                        isLoggedUserProfile
                                                                        }) => {

	const { openModal } = useModal();
	const { patchWorkingDays } = useFreelancerOnboardingService();

	const formatWorkingDays = (): string => {
		const allDays = Object.keys(WORKING_DAYS) as WorkingDayKey[];
		const workDays: WorkingDayKey[] = [ 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY' ];

		const isAllDays = userWorkingDays.length === allDays.length;
		if (isAllDays) {
			return "Wszystkie dni tygodnia";
		}

		const isWorkDays = userWorkingDays.length === workDays.length &&
			workDays.every(day => userWorkingDays.includes(day));
		if (isWorkDays) {
			return "Dni robocze";
		}

		const sortedDays = [ ...userWorkingDays ].sort(
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
					ranges.push(`${ startDayName } - ${ endDayName }`);
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
			id: 'WorkingDaysModalItem',
			title: 'Edytuj dostępność',
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			shouldCloseOnSaving: true,
			withSaveBtn: true,
			child: <WorkingDaysModalItem userWorkingDays={ userWorkingDays } onSave={ handleSave }/>
		});
	};

	return (
		<>
			<div className={ styles['info__icon'] }>
				<img src={ calendar } alt="calendar"/>
			</div>
			<p>{ formatWorkingDays() }</p>
			{ isLoggedUserProfile &&
                <div className={ styles['info__btn'] }>
                    <ActionBtn kind={ 'Edit' }
                               withBorder={ false }
                               backgroundColor={ 'transparent' }
                               onClick={ editWorkingDays }/>
                </div>
			}
		</>
	);
}

export default WorkingDaysProfileItem;