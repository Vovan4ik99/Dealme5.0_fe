export const generatePolishMonthNames = (): string[] => {
	const formatter = new Intl.DateTimeFormat('pl-PL', { month: 'long' });
	const months = [];
	for (let month = 0; month < 12; month++) {
		const date = new Date(1990, month); //any year, does not matter
		months.push(formatter.format(date));
	}
	return months.map(month => month[0].toUpperCase() + month.slice(1));
};

export const getMonthNumber = (monthPolishName: string): number | null => {
	const polishMonthNames = generatePolishMonthNames();
	const index = polishMonthNames.indexOf(monthPolishName);
	return index !== -1 ? index + 1 : null;
};

export const getMonthPolishName = (monthNumber: number): string => {
	const polishMonthNames = generatePolishMonthNames();
	return polishMonthNames[monthNumber - 1];
};

export const generateYearItems = (yearFrom?: number): string[] => {
	const years = [];
	const startYear = yearFrom ?? 1990;
	const endYear = yearFrom ? yearFrom + 60 : 2050;
	for (let year = startYear; year <= endYear; year++) {
		years.push(year.toString());
	}
	return years;
};

export const getPolishMonthShort = (dateString: string) => {
	const date = new Date(dateString);
	const formatter = new Intl.DateTimeFormat('pl-PL', { month: 'short' });
	const month = formatter.format(date);
	return month.charAt(0).toUpperCase() + month.slice(1);
}
