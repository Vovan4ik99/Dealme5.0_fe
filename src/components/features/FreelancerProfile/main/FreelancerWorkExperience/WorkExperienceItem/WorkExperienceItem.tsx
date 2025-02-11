import React from "react";
import styles from "./WorkExperienceItem.module.scss";
import company_icon from '@icons/freelancer_profile/secondary_info/cloud.svg';
import date_icon from '@icons/freelancer_profile/secondary_info/calendar.svg';
import { formatDateRange } from "@utils/dateUtils.ts";
import localization_icon from '@icons/freelancer_profile/secondary_info/localization.svg';
import { getStateDescriptionByStateName } from "@utils/localizationUtils.ts";
import { WorkExperienceItemProps } from "./workExperienceItemTypes.ts";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";

const WorkExperienceItem: React.FC<WorkExperienceItemProps> = ({
	                                                               workExperience,
	                                                               states,
	                                                               onEdit,
	                                                               onDelete,
	                                                               isModalItem
                                                               }) => {

	const getLocalization = () => {
		const city = workExperience.city.slice(0, 1).toUpperCase().concat(workExperience.city.slice(1));

		const stateDescription = getStateDescriptionByStateName(states, workExperience.state);

		if (!stateDescription) return 'Brak danych';

		const state = stateDescription.slice(0, 1).toUpperCase().concat(stateDescription.slice(1));
		return `${ city }, ${ state }`;
	};

	return (
		<div style={
			isModalItem ? { borderWidth: '1px', padding: '16px', borderStyle: 'solid' } : {}
		} className={ styles['item'] }>
			{ isModalItem &&
                <div className={ styles['item__buttons'] }>
                    <ActionBtn key={ 'Edit' }
                               kind={ 'Edit' }
                               withBorder={ true }
                               backgroundColor={ 'transparent' }
                               onClick={ onEdit }/>
                    <ActionBtn key={ 'Delete' }
                               kind={ 'Delete' }
                               withBorder={ true }
                               backgroundColor={ 'transparent' }
                               onClick={ onDelete }/>
                </div>
			}
			<p style={ isModalItem ? { fontSize: '16px' } : { fontSize: '18px' } }
			   className={ styles['item__title'] }>
				{ workExperience.jobTitle }
			</p>
			<div className={ styles['item__content'] }>
				<div className={ styles['item__wrapper'] }>
					<img src={ company_icon } alt="company"/>
					<span className={ `${ styles['item__text'] } ${ isModalItem && styles['item__text--company'] }` }>
						{ workExperience.companyName }
					</span>
				</div>
				<div className={ styles['item__wrapper'] }>
					<img src={ date_icon } alt="date"/>
					<span className={ `${ styles['item__text'] } ${ styles['item__text--date'] }` }>
						{ formatDateRange(workExperience.startDate, workExperience.endDate ?? null) }
					</span>
				</div>
				<div className={ styles['item__wrapper'] }>
					<img src={ localization_icon } alt="localization"/>
					<span className={ styles['item__text'] }>
						{ getLocalization() }
					</span>
				</div>
			</div>
		</div>
	);
};

export default WorkExperienceItem;