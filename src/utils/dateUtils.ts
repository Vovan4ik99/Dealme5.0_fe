import { format } from "date-fns";
import { pl } from "date-fns/locale";

export const mapDateToYearMonth = (dateString: string | undefined | null) => {
	if (!dateString) return;
	const date = new Date(dateString);
	return {
		year: date.getFullYear(),
		month: date.getMonth() + 1
	};
};

export const getPolishMonthShort = (dateString: string) => {
	const date = new Date(dateString);
	const formatter = new Intl.DateTimeFormat('pl-PL', { month: 'short' });
	const month = formatter.format(date);
	return month.charAt(0).toUpperCase() + month.slice(1);
};

export const transformVideoDate = (dateString: string): string => {
	const date = new Date(dateString);

	return format(date, 'd MMM yyyy', { locale: pl });
};

export const formatDateRange = (startDateStr: string, endDateStr: string | null) => {
	const startDate = new Date(startDateStr);
	const startMonthYear = `${ getPolishMonthShort(startDateStr) } ${ startDate.getFullYear() }`;
	let endMonthYear = 'Teraz';
	if (endDateStr) {
		const endDate = new Date(endDateStr);
		endMonthYear = `${ getPolishMonthShort(endDateStr) } ${ endDate.getFullYear() }`;
	}

	return `${ startMonthYear } - ${ endMonthYear }`;
}

export const createDateFromYearMonth = (year: number, month: number) => {
	const startDate = new Date(year, month);
	return startDate.toISOString().split("T")[0];
};
