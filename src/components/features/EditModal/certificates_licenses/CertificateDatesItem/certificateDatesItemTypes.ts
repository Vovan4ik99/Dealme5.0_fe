import {
	DateErrorKey
} from "@components/features/EditModal/certificates_licenses/CertificateLicenseAddModalItem/certificateLicenseAddModalItemTypes.ts";
import React from "react";

export interface ICertificateDatesItemProps {
	onStartMonthSelect: (month: number) => void;
	onEndMonthSelect: (month: number) => void;
	onStartYearSelect: (year: number) => void;
	onEndYearSelect: (year: number) => void;
	selectedStartMonth: number;
	selectedEndMonth: number;
	selectedStartYear: number;
	selectedEndYear: number;
	dateErrors: Map<DateErrorKey, string>;
	onDateErrorChange:  React.Dispatch<React.SetStateAction<Map<DateErrorKey, string>>>;
	isOngoingChecked: boolean;
	onOngoingChange: (isOngoing: boolean) => void;
}