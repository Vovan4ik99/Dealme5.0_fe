import React, { useCallback, useEffect } from "react";
import {
	IAddEducationModalItemProps,
	IEducationForm
} from "@components/features/EditModal/education/AddEducationModalItem/addEducationModalItemTypes.ts";
import styles from './AddEducationModalItem.module.scss';
import { useForm, useWatch } from "react-hook-form";
import { createDateFromYearMonth, mapDateToYearMonth } from "@utils/dateUtils.ts";
import CustomInput from "@ui/CustomInput/CustomInput.tsx";
import LocalizationForm from "@components/features/EditModal/localization/LocalizationForm/LocalizationForm.tsx";
import DatesForm from "@components/features/EditModal/certificates_licenses/DatesForm/DatesForm.tsx";
import { IFreelancerEducationRequest } from "@shared/freelancer/education.ts";

const AddEducationModalItem: React.FC<IAddEducationModalItemProps> = ({registerOnSave, handleClose, onSave, education, isEdit}) => {

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		trigger,
		setValue,
		clearErrors,
		unregister
	} = useForm<IEducationForm>({
		shouldFocusError: false,
		mode: 'onChange',
		defaultValues: {
			educationName: education?.nameOfEducation,
			organization: education?.titleOfEducation,
			country: education?.localization.country,
			state: education?.localization.state,
			city: education?.localization.city,
			startMonth: mapDateToYearMonth(education?.startDate)?.month,
			startYear: mapDateToYearMonth(education?.startDate)?.year,
			endMonth: mapDateToYearMonth(education?.endDate)?.month,
			endYear: mapDateToYearMonth(education?.endDate)?.year,
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
			const request: IFreelancerEducationRequest = {
				nameOfEducation: data.educationName,
				titleOfEducation: data.organization,
				startDate: createDateFromYearMonth(startYear, startMonth),
				endDate: (endYear && endMonth) ? createDateFromYearMonth(endYear, endMonth) : null,
				localization: {
					country: data.country,
					state: data.state,
					city: data.city
				}
			}
			onSave(request);
			handleClose!();
		})();
	}, [ endMonth, endYear, handleClose, handleSubmit, onSave, startMonth, startYear ]);

	useEffect(() => {
		registerOnSave!(onSubmit);
	});

	return (
		<form className={styles['modal']}>
			<CustomInput key={ 'educationName' }
			             id={'educationName'}
			             placeholder={'np. Marketing'}
			             register={register}
			             type={'text'}
			             labelText={'Nazwa kierunku'}
			             validation={{required: 'Podaj nazwę kierunku'}}
			             errorMessage={errors.educationName?.message}/>
			<CustomInput key={ 'organization' }
			             id={'organization'}
			             placeholder={'np. Uniwersytet Adama Mickiewicza'}
			             register={register}
			             type={'text'}
			             labelText={'Nazwa uczelni'}
			             validation={{required: 'Podaj nazwę uczelni'}}
			             errorMessage={errors.organization?.message}/>
			<LocalizationForm formData={ { country, state, city } }
			                  register={ register }
			                  setValue={ setValue }
			                  trigger={ trigger }
			                  isCityRequired={ true }
			                  errors={ errors }/>
			<div className={ styles['modal__dates'] }>
				<p className={ styles['modal__title'] }>
					W jakim okresie studiowałeś na tej uczelni?
				</p>
				<DatesForm register={ register }
				           setValue={ setValue }
				           formData={ { startMonth, startYear, endMonth, endYear } }
				           trigger={ trigger }
				           errors={ errors }
				           checkboxLabel={ 'Aktualnie studiuję na tej uczelni' }
				           clearErrors={ clearErrors }
				           isOngoingChecked={ isEdit }
				           unregister={ unregister }/>
			</div>
		</form>
	);
};

export default AddEducationModalItem;