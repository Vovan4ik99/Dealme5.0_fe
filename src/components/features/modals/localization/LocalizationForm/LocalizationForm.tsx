import React, { useEffect, useState } from "react";
import SelectFormInput from "@ui/select/SelectFormInput/SelectFormInput.tsx";
import { ISelectItem } from "@ui/select/SelectFormInput/selectFormInputTypes.ts";
import {
	ILocalizationFormProps,
	ILocalizationFormState,
} from "@components/features/modals/localization/LocalizationForm/localizationFormTypes.ts";
import { Path, PathValue } from "react-hook-form";
import CustomInput from "@ui/form/CustomInput/CustomInput.tsx";
import { useFreelancerProfileAsideInfoService } from "@services/freelancer/freelancerProfileAsideInfoService.ts";
import { PRIORITY_COUNTRY_KEY } from "@constants/constans.ts";
import {
	getCountryNameByDescription,
	getDescriptionByCountryName,
	getStateDescriptionByStateName,
	getStateNameByDescription,
	getStatesAsSelectItems,
	sortCountries
} from "@utils/localizationUtils.ts";
import { IFreelancerCountry, IFreelancerState } from "@shared/freelancer/localization.ts";

const LocalizationForm = <T extends ILocalizationFormState>({
	                                                            formData,
	                                                            errors,
	                                                            trigger,
	                                                            register,
	                                                            setValue,
	                                                            isCityRequired
                                                            }: ILocalizationFormProps<T>) => {

	const { getCountries, getStates } = useFreelancerProfileAsideInfoService();

	const [ countries, setCountries ] = useState<IFreelancerCountry[]>([]);
	const [ states, setStates ] = useState<IFreelancerState[]>([]);

	useEffect(() => {
		getCountries()
			.then(setCountries)
			.catch(console.error);
	}, [ getCountries ]);

	useEffect(() => {
		if (formData.country === PRIORITY_COUNTRY_KEY && states.length === 0) {
			getStates()
				.then(setStates)
				.catch(console.error);
		}
	}, [ countries, formData.country, getStates, states ]);

	const onCountryChange = (country: string) => {
		const countryToWrite = getCountryNameByDescription(countries, country);
		setValue('country' as Path<T>, countryToWrite as PathValue<T, Path<T>>);
		setStates([]);
	};

	const onStateChange = (state: string) => {
		const stateToWrite = getStateNameByDescription(states, state);
		setValue('state' as Path<T>, stateToWrite as PathValue<T, Path<T>>);
	};

	const getCountriesAsSelectItems = (countries: IFreelancerCountry[]): ISelectItem[] => {
		return countries.map(country => {
			return { text: country.description, info: null };
		});
	};

	return (
		<>
			<SelectFormInput key={ 'country' }
			                 selectItems={ getCountriesAsSelectItems(sortCountries(countries)) }
			                 text={ getDescriptionByCountryName(countries, formData.country) ?? null }
			                 trigger={ trigger }
			                 register={ register }
			                 id={ "country" as Path<T> }
			                 labelText={ 'Kraj' }
			                 validationRules={ {
				                 required: 'Wybierz kraj'
			                 } }
			                 onValueChange={ onCountryChange }
			                 error={ errors.country ?? null }/>
			<SelectFormInput key={ 'state' }
			                 selectItems={ getStatesAsSelectItems(states) }
			                 text={ getStateDescriptionByStateName(states, formData.state) ?? null }
			                 onValueChange={ onStateChange }
			                 trigger={ trigger }
			                 register={ register }
			                 id={ "state" as Path<T> }
			                 labelText={ 'Województwo' }
			                 validationRules={ {
				                 required: 'Wybierz województwo'
			                 } }
			                 error={ errors.state ?? null }/>
			<CustomInput id={ 'city' }
			             autoComplete={ 'city' }
			             labelText={ `Miejscowość ${ !isCityRequired ? '(opcjonalnie)' : '' }` }
			             type={ 'text' }
			             placeholder={ 'Podaj miasto' }
			             validation={ isCityRequired ? { required: 'Podaj miasto' } : {} }
			             errorMessage={ errors.city?.message }
			             onChange={
				             (newCity: string) => setValue("city" as Path<T>, newCity as PathValue<T, Path<T>>)
			             }
			             register={ register }/>
		</>
	);
};

export default LocalizationForm;