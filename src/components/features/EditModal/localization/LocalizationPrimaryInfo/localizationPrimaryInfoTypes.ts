import {IFreelancerCountry, IFreelancerState} from "@shared/freelancerTypes.ts";

export interface ILocalizationPrimaryInfoProps {
	onCitySelect: (city: string) => void;
	selectedCity: string | null;
	countries: IFreelancerCountry[];
	selectedCountry: string | null;
	onCountrySelect: (country: string) => void;
	states: IFreelancerState[];
	selectedState: string | null;
	onStateSelect: (state: string) => void;
}