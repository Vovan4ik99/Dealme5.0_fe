import { ISubIndustry } from "@shared/onboarding/freelancerOnboardingTypes.ts";

export interface IIndustryItemProps {
  text: string;
  subIndustries: ISubIndustry[];
  selectedSubIndustries: number[];
  onChange: (newSubIndustry: number) => void;
  isSearchActive: boolean;
  isInSearchRange: boolean;
}