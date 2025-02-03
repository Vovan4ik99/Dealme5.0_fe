import styles from "./CertificateDatesItem.module.scss";
import SelectInput from "@ui/SelectInput/SelectInput.tsx";
import {generatePolishMonthNames, generateYearItems, getMonthNumber, getMonthPolishName} from "@utils/dateUtils.ts";
import React from "react";
import {
	ICertificateDatesItemProps
} from "@components/features/EditModal/certificates_licenses/CertificateDatesItem/certificateDatesItemTypes.ts";
import InputError from "@ui/InputError/InputError.tsx";
import CustomCheckbox from "@ui/CustomCheckbox/CustomCheckbox.tsx";

const CertificateDatesItem: React.FC<ICertificateDatesItemProps> = ({
	                                                                    selectedStartMonth,
	                                                                    selectedEndMonth,
	                                                                    selectedStartYear,
	                                                                    selectedEndYear,
	                                                                    onStartMonthSelect,
	                                                                    onStartYearSelect,
	                                                                    onEndMonthSelect,
	                                                                    onEndYearSelect,
	                                                                    dateErrors,
	                                                                    onDateErrorChange,
	                                                                    isOngoingChecked,
	                                                                    onOngoingChange
                                                                    }) => {

	const selectStartMonth = (monthName: string) => {
		const monthNumber = getMonthNumber(monthName);
		if (monthNumber) {
			onStartMonthSelect(monthNumber);
			onDateErrorChange(prevState => {
				prevState.delete('startMonth');
				return prevState;
			});
		}
	};

	const selectEndMonth = (monthName: string) => {
		const monthNumber = getMonthNumber(monthName);
		if (monthNumber) {
			onEndMonthSelect(monthNumber);
			onDateErrorChange(prevState => {
				prevState.delete('endMonth');
				return prevState;
			});
		}
	};

	const selectStartYear = (year: string) => {
		onStartYearSelect(parseInt(year));
		onDateErrorChange(prevState => {
			prevState.delete('startYear');
			return prevState;
		});
	};

	const selectEndYear = (year: string) => {
		onEndYearSelect(parseInt(year));
		onDateErrorChange(prevState => {
			prevState.delete('endYear');
			return prevState;
		});
	};

	const generateMonthSelectItems = () => {
		return generatePolishMonthNames().map((month) => {
			return {text: month, info: null}
		});
	};

	const generateYearSelectItems = (yearFrom?: number) => {
		return generateYearItems(yearFrom).map((year) => {
			return {text: year, info: null}
		});
	};

	const onCheckboxChange = () => {
		onDateErrorChange(prevState => {
			prevState.delete('endYear');
			prevState.delete('endMonth');
			return prevState;
		});
		onOngoingChange(!isOngoingChecked);
	}

	return (
		<div className={styles['dates__content']}>
			<div className={styles['dates__date']}>
				<span className={styles['dates__text']}>Początek</span>
				<div>
					<SelectInput selectItems={generateMonthSelectItems()}
					             onClick={selectStartMonth}
					             text={selectedStartMonth === 0 ? 'Wybierz' : getMonthPolishName(selectedStartMonth)}
					             isError={dateErrors.has('startMonth')}
					             labelText={'Miesiąc'}/>
					{dateErrors.has('startMonth') && <InputError text={dateErrors.get('startMonth')!}/>}
				</div>
				<div>
					<SelectInput selectItems={generateYearSelectItems()}
					             onClick={selectStartYear}
					             text={selectedStartYear === 0 ? 'Wybierz' : `${selectedStartYear}`}
					             isError={dateErrors.has('startYear')}
					             labelText={'Rok'}/>
					{dateErrors.has('startYear') && <InputError text={dateErrors.get('startYear')!}/>}
				</div>
				<div>
					<CustomCheckbox label={'Jestem w trakcie'}
					                id={'ongoing'}
					                isChecked={isOngoingChecked}
					                onChange={onCheckboxChange}/>
				</div>
			</div>
			{!isOngoingChecked && <div className={styles['dates__date']}>
                <span className={styles['dates__text']}>Koniec</span>
                <div>
                    <SelectInput selectItems={generateMonthSelectItems()}
                                 onClick={selectEndMonth}
                                 text={selectedEndMonth === 0 ? 'Wybierz' : getMonthPolishName(selectedEndMonth)}
                                 isError={dateErrors.has('endMonth')}
                                 labelText={'Miesiąc'}/>
					{dateErrors.has('endMonth') && <InputError text={dateErrors.get('endMonth')!}/>}
                </div>
                <div>
                    <SelectInput
                        selectItems={generateYearSelectItems(selectedStartYear !== 0 ? selectedStartYear + 1 : undefined)}
                        onClick={selectEndYear}
                        text={selectedEndYear === 0 ? 'Wybierz' : `${selectedEndYear}`}
                        isError={dateErrors.has('endYear')}
                        labelText={'Rok'}/>
					{dateErrors.has('endYear') && <InputError text={dateErrors.get('endYear')!}/>}
                </div>
            </div>}
		</div>
	);
}

export default CertificateDatesItem;