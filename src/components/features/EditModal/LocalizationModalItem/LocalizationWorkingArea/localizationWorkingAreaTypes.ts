import {WORKING_AREAS} from "@constants/workingAreas.ts";
import {IFreelancerCountry, IFreelancerState} from "@shared/freelancerTypes.ts";

export type ILocalizationWorkingAreaProps = {
	userWorkingArea: keyof typeof WORKING_AREAS | null;
	onWorkingAreaChange: (value: keyof typeof WORKING_AREAS) => void;
	userWorkingAreaValue: string | null;
	onWorkingAreaValueChange: (value: string | null) => void;
	countries: IFreelancerCountry[];
	states: IFreelancerState[];
}