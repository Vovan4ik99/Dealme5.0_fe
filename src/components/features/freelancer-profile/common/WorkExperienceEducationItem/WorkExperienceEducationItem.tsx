import React from "react";
import styles from "./WorkExperienceEducationItem.module.scss";
import company_icon from '@icons/freelancer_profile/secondary_info/cloud.svg';
import date_icon from '@icons/freelancer_profile/secondary_info/calendar.svg';
import { formatDateRange } from "@utils/dateUtils.ts";
import localization_icon from '@icons/freelancer_profile/secondary_info/localization.svg';
import { getStateDescriptionByStateName } from "@utils/localizationUtils.ts";
import { WorkExperienceEducationItemProps } from "./workExperienceEducationItemTypes.ts";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import education_icon from '@icons/freelancer_profile/education/university.svg';

const WorkExperienceEducationItem: React.FC<WorkExperienceEducationItemProps> = ({
	                                                                                 title,
	                                                                                 organization,
	                                                                                 city,
	                                                                                 state,
	                                                                                 startDate,
	                                                                                 endDate,
	                                                                                 itemType,
	                                                                                 states,
	                                                                                 onEdit,
	                                                                                 onDelete,
	                                                                                 isModalItem
                                                                                 }) => {

	const getLocalization = () => {
		const changedCity = city.slice(0, 1).toUpperCase().concat(city.slice(1));

		const stateDescription = getStateDescriptionByStateName(states, state);

		if (!stateDescription) return 'Brak danych';

		const changedState = stateDescription.slice(0, 1).toUpperCase().concat(stateDescription.slice(1));
		return `${ changedCity }, ${ changedState }`;
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
				{ title }
			</p>
			<div className={ styles['item__content'] }>
				<div className={ styles['item__wrapper'] }>
					<img src={ itemType === 'workExperience' ? company_icon : education_icon } alt="organization"/>
					<span className={ `${ styles['item__text'] }` }>
						{ organization }
					</span>
				</div>
				<div className={ styles['item__wrapper'] }>
					<img src={ date_icon } alt="date"/>
					<span className={ `${ styles['item__text'] } ${ styles['item__text--date'] }` }>
						{ formatDateRange(startDate, endDate ?? null) }
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

export default WorkExperienceEducationItem;