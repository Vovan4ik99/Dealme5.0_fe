import React, { useCallback, useEffect, useState } from "react";
import {
	IWorkingHoursProfileItemProps
} from "@components/features/freelancer-profile/aside/SecondaryInfo/WorkingHoursProfileItem/workingHoursProfileItemTypes.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import clock from "@icons/freelancer_profile/secondary_info/clock.svg";
import styles from "@components/features/freelancer-profile/aside/SecondaryInfo/SecondaryInfo.module.scss";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import WorkingHoursModalItem
	from "@components/features/modals/working_hours/WorkingHoursModalItem/WorkingHoursModalItem.tsx";

const WorkingHoursProfileItem: React.FC<IWorkingHoursProfileItemProps> = ({
	                                                                          userWorkingHour,
	                                                                          onSave,
	                                                                          isLoggedUserProfile
                                                                          }) => {

	const { getWorkingHours, patchWorkingHours, loadingStatus } = useFreelancerOnboardingService();
	const { openModal } = useModal();

	const [ workingHourDescription, setWorkingHourDescription ] = useState<string>('');

	useEffect(() => {
		getWorkingHours()
			.then(response => {
				setWorkingHourDescription(
					response.find(hour => hour.workingHour === userWorkingHour)?.description ?? ''
				);
			}).catch(console.error);
	}, [ getWorkingHours, userWorkingHour, workingHourDescription ]);

	const handleSave = useCallback((selectedWorkingHour: string) => {
		patchWorkingHours(selectedWorkingHour)
			.then(onSave)
			.catch(console.error);
	}, [ onSave, patchWorkingHours ]);

	const onEdit = () => {
		openModal({
			id: 'WorkingHoursModalItem',
			title: "Edytuj dyspozycyjność czasową",
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			shouldCloseOnSaving: true,
			withSaveBtn: true,
			child: <WorkingHoursModalItem userWorkingHour={ userWorkingHour } onSave={ handleSave }/>
		});
	}

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<>
			<div className={ styles['info__icon'] }>
				<img src={ clock } alt="clock"/>
			</div>
			<p>{ workingHourDescription } / tydzień</p>
			{ isLoggedUserProfile &&
                <div className={ styles['info__btn'] }>
                    <ActionBtn kind={ 'Edit' }
                               withBorder={ false }
                               backgroundColor={ 'transparent' }
                               onClick={ onEdit }/>
                </div>
			}
		</>
	)
};

export default WorkingHoursProfileItem;