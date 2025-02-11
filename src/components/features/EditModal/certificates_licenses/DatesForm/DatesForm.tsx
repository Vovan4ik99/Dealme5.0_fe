import styles from "./DatesForm.module.scss";
import SelectInput from "@ui/SelectInput/SelectInput.tsx";
import React, { useEffect, useState } from "react";
import { IDatesFormProps } from "@components/features/EditModal/certificates_licenses/DatesForm/datesFormTypes.ts";
import CustomCheckbox from "@ui/CustomCheckbox/CustomCheckbox.tsx";

const DatesForm: React.FC<IDatesFormProps> = ({
	                                              formData,
	                                              trigger,
	                                              register,
	                                              setValue,
	                                              checkboxLabel,
	                                              unregister,
	                                              clearErrors,
	                                              errors,
	                                              isOngoingChecked,
                                              }) => {
	const [ isOngoing, setIsOngoing ] = useState<boolean>(false);

	useEffect(() => {
		if (isOngoingChecked && (!formData.endMonth && !formData.endYear)) {
			setIsOngoing(true);
		}
	}, [formData.endMonth, formData.endYear, isOngoingChecked]);

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

	const getMonthNumber = (monthPolishName: string): number | null => {
		const polishMonthNames = generatePolishMonthNames();
		const index = polishMonthNames.indexOf(monthPolishName);
		return index !== -1 ? index + 1 : null;
	};

	const getMonthPolishName = (monthNumber: number): string => {
		const polishMonthNames = generatePolishMonthNames();
		return polishMonthNames[monthNumber - 1];
	};

	const generateYearItems = (yearFrom?: number): string[] => {
		const years = [];
		const startYear = yearFrom ?? 1990;
		const endYear = yearFrom ? yearFrom + 60 : 2050;
		for (let year = startYear; year <= endYear; year++) {
			years.push(year.toString());
		}
		return years;
	};

	const generatePolishMonthNames = (): string[] => {
		const formatter = new Intl.DateTimeFormat('pl-PL', { month: 'long' });
		const months = [];
		for (let month = 0; month < 12; month++) {
			const date = new Date(1990, month); //any year, does not matter
			months.push(formatter.format(date));
		}
		return months.map(month => month[0].toUpperCase() + month.slice(1));
	};

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
				<div className={ styles['dates__checkbox'] }>
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