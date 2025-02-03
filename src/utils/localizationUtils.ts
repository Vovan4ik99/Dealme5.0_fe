import {IFreelancerCountry, IFreelancerState} from "@shared/freelancerTypes.ts";
import {ISelectItem} from "@ui/SelectInput/selectInputTypes.ts";

export const getStateDescriptionByStateName = (
	states: IFreelancerState[],
	selectedState: string | null
) => {
	if (!selectedState && states.length > 0) {
		return states[0]?.description;
	}
	const freelancerState = states
		.find(state => state.state === selectedState);
	return freelancerState?.description ?? 'Brak';
}

export const getDescriptionByCountryName = (
	countries: IFreelancerCountry[],
	selectedCountry: string | null
) => {
	const freelancerCountry = countries
		.find(country => country.name === selectedCountry);
	return freelancerCountry?.description ?? 'Brak';
};

export const getCountriesAsSelectItems = (countries: IFreelancerCountry[]): ISelectItem[] => {
	return countries.map(country => {
		return {text: country.description, info: null};
	});
};

export const getStatesAsSelectItems = (states: IFreelancerState[]): ISelectItem[] => {
	return states.map(state => {
		return {text: state.description, info: null}
	});
};

export const getCountryNameByDescription = (
	countries: IFreelancerCountry[],
	description: string
) => {
	const country = countries
		.find(country => country.description === description);
	return country?.name ?? null;
};

export const getStateNameByDescription = (
	states: IFreelancerState[],
	description: string
) => {
	const state = states
		.find(state => state.description === description);
	return state?.state ?? null;
};


