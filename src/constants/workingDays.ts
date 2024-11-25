export const WORKING_DAYS = {
	MONDAY: "Poniedziałek",
	TUESDAY: "Wtorek",
	WEDNESDAY: "Środa",
	THURSDAY: "Czwartek",
	FRIDAY: "Piątek",
	SATURDAY: "Sobota",
	SUNDAY: "Niedziela"
} as const;

export type WorkingDayKey = keyof typeof WORKING_DAYS;
