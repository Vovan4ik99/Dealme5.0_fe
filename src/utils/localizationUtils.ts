import { ISelectItem } from "@ui/SelectInput/selectInputTypes.ts";
import { PRIORITY_COUNTRY_KEY } from "@constants/constans.ts";
import { IFreelancerCountry, IFreelancerState } from "@shared/freelancer/localization.ts";

export const sortCountries = (countries: IFreelancerCountry[]) => {
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

export const getStatesAsSelectItems = (states: IFreelancerState[]): ISelectItem[] => {
	return states.map(state => {
		return {text: state.description, info: null}
	});
};

export const getStateDescriptionByStateName = (
	states: IFreelancerState[],
	selectedState: string | null
) => {
	const freelancerState = states
		.find(state => state.state === selectedState);
	return freelancerState?.description;
}

export const getDescriptionByCountryName = (
	countries: IFreelancerCountry[],
	selectedCountry: string | null
) => {
	const freelancerCountry = countries
		.find(country => country.name === selectedCountry);
	return freelancerCountry?.description;
};

export const getStateNameByDescription = (
	states: IFreelancerState[],
	description: string
) => {
	const state = states
		.find(state => state.description === description);
	return state?.state ?? null;
};

export const getCountryNameByDescription = (
	countries: IFreelancerCountry[],
	description: string
) => {
	const country = countries
		.find(country => country.description === description);
	return country?.name ?? null;
};




