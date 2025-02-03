import styles from "@components/features/EditModal/localization/LocalizationModalItem/LocalizationModalItem.module.scss";
import SelectInput from "@ui/SelectInput/SelectInput.tsx";
import {
	getCountriesAsSelectItems,
	getDescriptionByCountryName,
	getStateDescriptionByStateName,
	getStatesAsSelectItems
} from "@utils/localizationUtils.ts";
import CustomInput from "@ui/CustomInput/CustomInput.tsx";
import React from "react";
import {
	ILocalizationPrimaryInfoProps
} from "@components/features/EditModal/localization/LocalizationPrimaryInfo/localizationPrimaryInfoTypes.ts";

const LocalizationPrimaryInfo: React.FC<ILocalizationPrimaryInfoProps> = ({
	                                                                          onCitySelect,
	                                                                          selectedCity,
	                                                                          countries,
	                                                                          onCountrySelect,
	                                                                          selectedCountry,
	                                                                          states,
	                                                                          selectedState,
	                                                                          onStateSelect
                                                                          }) => {

	return (
		<div className={styles['item']}>
			<p className={styles['item__text']}>Ustaw swoją lokalizację</p>
			<div className={styles['item__wrapper']}>
				<SelectInput text={getDescriptionByCountryName(countries, selectedCountry)}
				             labelText={'Kraj'}
				             onClick={onCountrySelect}
				             selectItems={getCountriesAsSelectItems(countries)}/>
				<SelectInput text={getStateDescriptionByStateName(states, selectedState)}
				             labelText={'Województwo'}
				             onClick={onStateSelect}
				             selectItems={getStatesAsSelectItems(states)}/>
				<CustomInput id={'city'}
				             autoComplete={'city'}
				             labelText={'Miejscowość (opcjonalnie)'}
				             type={'text'}
				             placeholder={'Podaj miasto'}
				             existedValue={selectedCity ?? ''}
				             onChange={onCitySelect}
				             register={null}/>
			</div>
		</div>
	);
}

export default LocalizationPrimaryInfo;