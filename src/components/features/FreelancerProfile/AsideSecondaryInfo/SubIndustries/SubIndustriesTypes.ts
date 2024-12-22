interface IIndustries {
  id: number;
  name: string;
  description: string;
}
export interface ISubIndustriesProps {
  subIndustries: IIndustries[];
  workingDays: string;
  workingHours: string;
  location: string;
  languages: string;
  onUpdateWorkingHours: (newHours: string) => void;
}
