import {ISubIndustry} from "@shared/onboardingTypes.ts";

export interface IIndustryItemProps {
  text: string;
  subIndustries: ISubIndustry[];
  selectedSubIndustries: number[];
  onChange: (newSubIndustry: number) => void;
  isSearchActive: boolean;
  isInSearchRange: boolean;
}