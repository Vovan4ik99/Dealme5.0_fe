import styles from './AddWorkExperienceModalItem.module.scss';
import { useForm, useWatch } from "react-hook-form";
import {
	IAddWorkExperienceModalItemProps,
	IWorkExperienceForm
} from "@components/features/EditModal/work_experience/AddWorkExperienceModalItem/addWorkExperienceModalItemTypes.ts";
import React, { useCallback, useEffect } from "react";
import CustomInput from "@ui/CustomInput/CustomInput.tsx";
import LocalizationForm from "@components/features/EditModal/localization/LocalizationForm/LocalizationForm.tsx";
import DatesForm from "@components/features/EditModal/certificates_licenses/DatesForm/DatesForm.tsx";
import { createDateFromYearMonth, mapDateToYearMonth } from "@utils/dateUtils.ts";
import { IFreelancerWorkExperienceRequest } from "@shared/freelancer/work-experience.ts";

const AddWorkExperienceModalItem: React.FC<IAddWorkExperienceModalItemProps> = ({
	                                                                                onSave,
	                                                                                registerOnSave,
	                                                                                handleClose,
	                                                                                workExperience,
	                                                                                isEdit
                                                                                }) => {

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		trigger,
		setValue,
		clearErrors,
		unregister
	} = useForm<IWorkExperienceForm>({
		shouldFocusError: false,
		mode: 'onChange',
		defaultValues: {
			jobTitle: workExperience?.jobTitle,
			companyName: workExperience?.companyName,
			country: workExperience?.country,
			state: workExperience?.state,
			city: workExperience?.city,
			startMonth: mapDateToYearMonth(workExperience?.startDate)?.month,
			startYear: mapDateToYearMonth(workExperience?.startDate)?.year,
			endMonth: mapDateToYearMonth(workExperience?.endDate)?.month,
			endYear: mapDateToYearMonth(workExperience?.endDate)?.year,
		}
	});

	const country = useWatch({ name: 'country', control });
	const state = useWatch({ name: 'state', control });
	const city = useWatch({ name: 'city', control });
	const startMonth = useWatch({ name: 'startMonth', control });
	const startYear = useWatch({ name: 'startYear', control });
	const endMonth = useWatch({ name: 'endMonth', control });
	const endYear = useWatch({ name: 'endYear', control });

	const onSubmit = useCallback(() => {
		handleSubmit(data => {
			const request: IFreelancerWorkExperienceRequest = {
				jobTitle: data.jobTitle,
				companyName: data.companyName,
				country: data.country,
				state: data.state,
				city: data.city,
				startDate: createDateFromYearMonth(startYear, startMonth),
				endDate: (endYear && endMonth) ? createDateFromYearMonth(endYear, endMonth) : null
			}
			onSave(request);
			handleClose!();
		})();
	}, [ endMonth, endYear, handleClose, handleSubmit, onSave, startMonth, startYear ]);

	useEffect(() => {
		registerOnSave!(onSubmit);
	});

	return (
		<form className={ styles['modal'] }>
			<CustomInput key={ 'jobTitle' }
			             preset={ 'jobTitle' }
			             register={ register }
			             errorMessage={ errors.jobTitle?.message }/>
			<CustomInput key={ 'companyName' }
			             preset={ 'workExperienceCompany' }
			             register={ register }
			             errorMessage={ errors.companyName?.message }/>
			<LocalizationForm formData={ { country, state, city } }
			                  register={ register }
			                  setValue={ setValue }
			                  trigger={ trigger }
			                  isCityRequired={ true }
			                  errors={ errors }/>
			<div className={ styles['modal__dates'] }>
				<p className={ styles['modal__title'] }>
					W jakim okresie pracowałeś na tym stanowisku?
				</p>
				<DatesForm register={ register }
				           setValue={ setValue }
				           formData={ { startMonth, startYear, endMonth, endYear } }
				           trigger={ trigger }
				           errors={ errors }
				           checkboxLabel={ 'Aktualnie pracuję na tym stanowisku' }
				           clearErrors={ clearErrors }
				           isOngoingChecked={ isEdit }
				           unregister={ unregister }/>
			</div>
		</form>
	);
}

export default AddWorkExperienceModalItem;