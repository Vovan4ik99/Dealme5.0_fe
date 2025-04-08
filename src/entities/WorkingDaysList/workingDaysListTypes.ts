import { WorkingDayKey } from "@constants/onboarding/workingDays.ts";
import React from "react";

export interface IWorkingDaysListProps {
	selectedDays: WorkingDayKey[];
	setSelectedDays: React.Dispatch<React.SetStateAction<WorkingDayKey[]>>
}