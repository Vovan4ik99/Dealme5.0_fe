//It is workaround, because backend does not have logic for servicing tools images
import copper from "@icons/sales_tools/copper.svg";
import hubspot from "@icons/sales_tools/hubspot.svg";
import livespace from "@icons/sales_tools/livespace.svg";
import monday from "@icons/sales_tools/monday.svg";
import msc_dynamics_365 from "@icons/sales_tools/msc_dynamics_365.svg";
import pipedrive from "@icons/sales_tools/pipedrive.svg";
import salesforce from "@icons/sales_tools/salesforce.svg";
import zoho from "@icons/sales_tools/zoho.svg";

const salesToolsPictures: Record<string, string> = {
	Pipedrive: pipedrive,
	Salesforce: salesforce,
	HubSpot: hubspot,
	Zoho: zoho,
	"MSC Dynamics 365": msc_dynamics_365,
	Copper: copper,
	Livespace: livespace,
	Monday: monday,
};

export const getPictureForSalesTools = (toolName: string): string => {
	return salesToolsPictures[toolName] || '';
};

export const getToolKindNameByKind = (kind: string) => {
	switch (kind) {
		case 'COLD_MAILING':
			return 'Cold mailing';
		case 'PROSPECTING':
			return 'Prospecting';
		case 'AUTOMATYZACJA_MARKETINGU':
			return 'Automatyzacja marketingu';
		case 'COLD_CALLING':
			return 'Cold calling';
		case 'ANALITYKA':
			return 'Analityka';
		case 'ZARZADZANIE_PROJEKTAMI':
			return 'Zarządzanie projektami / zadaniami';
		case 'NEWSLETTER':
			return 'Newsletter';
		case 'INNE':
			return 'Inne narzędzia wspierające sprzedaż';
		default:
			return kind;
	}
};