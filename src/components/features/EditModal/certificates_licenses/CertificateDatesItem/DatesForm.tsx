import styles from "./DatesForm.module.scss";
import SelectInput from "@ui/SelectInput/SelectInput.tsx";
import { generatePolishMonthNames, generateYearItems, getMonthNumber, getMonthPolishName } from "@utils/dateUtils.ts";
import React, { useEffect, useState } from "react";
import {
	IDatesFormProps
} from "@components/features/EditModal/certificates_licenses/CertificateDatesItem/datesFormTypes.ts";
import CustomCheckbox from "@ui/CustomCheckbox/CustomCheckbox.tsx";

const DatesForm: React.FC<IDatesFormProps> = ({
	                                              formData,
	                                              trigger,
	                                              register,
	                                              setValue,
	                                              checkboxLabel,
	                                              unregister,
	                                              clearErrors,
	                                              errors
                                              }) => {
	const [ isOngoing, setIsOngoing ] = useState<boolean>(false);

	useEffect(() => {
		if (isOngoing) {
			unregister('endMonth');
			unregister('endYear');
			clearErrors('endMonth');
			clearErrors('endYear');
			return;
		}
		register('endMonth', { required: 'Wybierz miesiąc końcowy' });
		register('endYear', { required: 'Wybierz końcowy rok' });
	}, [ clearErrors, isOngoing, register, unregister ]);

	const selectStartMonth = (monthName: string) => {
		setValue('startMonth', getMonthNumber(monthName));
	};

	const selectEndMonth = (monthName: string) => {
		setValue('endMonth', getMonthNumber(monthName));
	};

	const selectStartYear = (year: string) => {
		setValue('startYear', parseInt(year));
	};

	const selectEndYear = (year: string) => {
		setValue('endYear', parseInt(year));
	};

	const generateMonthSelectItems = () => {
		return generatePolishMonthNames().map((month) => {
			return { text: month, info: null }
		});
	};

	const generateYearSelectItems = (yearFrom?: number) => {
		return generateYearItems(yearFrom).map((year) => {
			return { text: year, info: null }
		});
	};

	return (
		<div className={ styles['dates__content'] }>
			<div className={ styles['dates__date'] }>
				<span className={ styles['dates__text'] }>Początek</span>
				<SelectInput key={ 'startMonth' }
				             id={ 'startMonth' }
				             trigger={ trigger }
				             register={ register }
				             selectItems={ generateMonthSelectItems() }
				             text={ getMonthPolishName(formData.startMonth) }
				             onValueChange={ selectStartMonth }
				             validationRules={ {
					             required: 'Wybierz miesiąc początkowy'
				             } }
				             error={ errors.startMonth ?? null }
				             labelText={ 'Miesiąc' }/>
				<SelectInput key={ 'startYear' }
				             id={ 'startYear' }
				             register={ register }
				             trigger={ trigger }
				             onValueChange={ selectStartYear }
				             selectItems={ generateYearSelectItems() }
				             validationRules={ {
					             required: 'Wybierz końcowy rok'
				             } }
				             text={ formData.startYear ? `${ formData.startYear }` : null }
				             error={ errors.startYear ?? null }
				             labelText={ 'Rok' }/>
				<div>
					<CustomCheckbox label={ checkboxLabel }
					                id={ 'ongoing' }
					                isChecked={ isOngoing }
					                onChange={ () => setIsOngoing(!isOngoing) }/>
				</div>
			</div>
			{ !isOngoing && <div className={ styles['dates__date'] }>
                <span className={ styles['dates__text'] }>Koniec</span>
                <SelectInput key={ 'endMonth' }
                             id={ 'endMonth' }
                             selectItems={ generateMonthSelectItems() }
                             onValueChange={ selectEndMonth }
                             text={ getMonthPolishName(formData.endMonth) }
                             trigger={ trigger }
                             register={ register }
                             error={ errors.endMonth ?? null }
                             labelText={ 'Miesiąc' }/>
                <SelectInput id={ 'endYear' }
                             key={ 'endYear' }
                             selectItems={ generateYearSelectItems(formData.startYear ? formData.startYear + 1 : undefined) }
                             onValueChange={ selectEndYear }
                             text={ formData.endYear ? `${ formData.endYear }` : null }
                             trigger={ trigger }
                             register={ register }
                             error={ errors.endYear ?? null }
                             labelText={ 'Rok' }/>
            </div> }
		</div>
	);
}

export default DatesForm;