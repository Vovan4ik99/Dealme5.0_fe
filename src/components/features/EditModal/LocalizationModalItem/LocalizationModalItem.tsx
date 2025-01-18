import {useFreelancerProfileService} from "@services/freelancerProfileService.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import React, {useCallback, useEffect, useState} from "react";
import {IFreelancerCountry, IFreelancerLocalization, IFreelancerState} from "@shared/freelancerTypes.ts";
import {
	ILocalizationModalItemProps
} from "@components/features/EditModal/LocalizationModalItem/localizationModalItemTypes.ts";
import LocalizationWorkingArea
	from "@components/features/EditModal/LocalizationModalItem/LocalizationWorkingArea/LocalizationWorkingArea.tsx";
import {WORKING_AREAS} from "@constants/workingAreas.ts";
import {PRIORITY_COUNTRY_KEY} from "@constants/constans.ts";
import LocalizationPrimaryInfo
	from "@components/features/EditModal/LocalizationModalItem/LocalizationPrimaryInfo/LocalizationPrimaryInfo.tsx";
import {getCountryNameByDescription, getStateNameByDescription} from "@utils/localizationUtils.ts";

const LocalizationModalItem: React.FC<ILocalizationModalItemProps> = ({
	                                                                      userLocalization,
	                                                                      onSave,
	                                                                      registerOnSave,
	                                                                      freelancerWorkingArea,
	                                                                      freelancerWorkingAreaValue
                                                                      }) => {

	const [selectedCountry, setSelectedCountry] = useState<string | null>(userLocalization?.country ?? null);
	const [selectedState, setSelectedState] = useState<string | null>(userLocalization?.state ?? null);
	const [city, setCity] = useState<string | null>(userLocalization?.city ?? null);
	const [selectedWorkingArea, setSelectedWorkingArea] = useState<keyof typeof WORKING_AREAS>(freelancerWorkingArea ?? 'COUNTRY');
	const [selectedWorkingAreaValue, setSelectedWorkingAreaValue] = useState<string | null>(freelancerWorkingAreaValue);
	const [countries, setCountries] = useState<IFreelancerCountry[]>([]);
	const [states, setStates] = useState<IFreelancerState[]>([]);

	const {
		patchFreelancerLocalization,
		patchFreelancerWorkingArea,
		getCountries,
		getStates,
		loadingStatus
	} = useFreelancerProfileService();

	useEffect(() => {
		if (!selectedCountry) {
			setSelectedCountry(PRIORITY_COUNTRY_KEY);
		}
	}, [selectedCountry]);

	useEffect(() => {
		if (selectedCountry === PRIORITY_COUNTRY_KEY && states.length === 0) {
			getStates()
				.then(setStates)
				.catch(console.error);
		}
	}, [getStates, selectedCountry, states]);

	useEffect(() => {
		getCountries()
			.then(setCountries)
			.catch(console.error);
	}, [getCountries]);

	const sortCountries = (countries: IFreelancerCountry[]) => {
		return countries.toSorted((a, b) => {
			if (a.name === PRIORITY_COUNTRY_KEY) {
				return -1;
			}
			if (b.name === PRIORITY_COUNTRY_KEY) {
				return 1;
			}
			return 0;
		});
	};

	const chooseCountry = (description: string) => {
		const countryName = getCountryNameByDescription(countries, description);
		setSelectedCountry(countryName);
		setSelectedState(null);
		setStates([]);
		setCity(null);
	};

	const chooseState = (stateDescription: string) => {
		const stateName = getStateNameByDescription(states, stateDescription);
		setSelectedState(stateName);
		setCity(null);
	};

	const chooseWorkingArea = (workingArea: keyof typeof WORKING_AREAS) => {
		setSelectedWorkingArea(workingArea);
		setSelectedWorkingAreaValue(null);
	}

	const chooseWorkingAreaValue = (value: string | null) => {
		console.log('chooseWorkingAreaValue: ', value);
		if (selectedWorkingArea === 'COUNTRY') {
			setSelectedWorkingAreaValue(value ?? PRIORITY_COUNTRY_KEY);
		} else {
			setSelectedWorkingAreaValue(getStateNameByDescription(states, (value ?? 'Dolnośląskie')));
		}
	};

	const patchWorkingArea = useCallback(() => {
		if (!selectedWorkingArea || !selectedWorkingAreaValue) return;
		patchFreelancerWorkingArea({workingArea: selectedWorkingArea, workingAreaValue: selectedWorkingAreaValue})
			.then(onSave)
			.catch(console.error);
	}, [onSave, patchFreelancerWorkingArea, selectedWorkingArea, selectedWorkingAreaValue]);

	const handleSave = useCallback(() => {
		if (selectedCountry && selectedState) {
			const localizationData: IFreelancerLocalization = {
				country: selectedCountry,
				state: selectedState,
			};
			if (city && city.trim() !== '') {
				localizationData.city = city.trim();
			}
			patchFreelancerLocalization(localizationData)
				.then(() => patchWorkingArea())
				.catch(console.error);
		}
	}, [city, patchFreelancerLocalization, patchWorkingArea, selectedCountry, selectedState]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [handleSave, registerOnSave]);

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<>
			<LocalizationPrimaryInfo countries={sortCountries(countries)}
			                         selectedCountry={selectedCountry}
			                         onCountrySelect={chooseCountry}
			                         states={states}
			                         selectedState={selectedState}
			                         onStateSelect={chooseState}
			                         selectedCity={city}
			                         onCitySelect={setCity}/>
			<LocalizationWorkingArea userWorkingArea={selectedWorkingArea}
			                         userWorkingAreaValue={selectedWorkingAreaValue}
			                         onWorkingAreaChange={chooseWorkingArea}
			                         countries={sortCountries(countries)}
			                         states={states}
			                         onWorkingAreaValueChange={chooseWorkingAreaValue}/>
		</>
	)
}

export default LocalizationModalItem;