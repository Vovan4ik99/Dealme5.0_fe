//It is workaround, because backend does not have logic for servicing tools images
import copper from "@icons/sales_tools/copper.svg";
import hubspot from "@icons/sales_tools/hubspot.svg";
import livespace from "@icons/sales_tools/livespace.svg";
import monday from "@icons/sales_tools/monday.svg";
import msc_dynamics_365 from "@icons/sales_tools/msc_dynamics_365.svg";
import pipedrive from "@icons/sales_tools/pipedrive.svg";
import salesforce from "@icons/sales_tools/salesforce.svg";
import zoho from "@icons/sales_tools/zoho.svg";

export const getPictureForSalesTools = (toolName: string) => {
	switch (toolName) {
		case 'Pipedrive':
			return pipedrive;
		case 'Salesforce':
			return salesforce;
		case 'HubSpot':
			return hubspot;
		case 'Zoho':
			return zoho;
		case 'MSC Dynamics 365':
			return msc_dynamics_365;
		case 'Copper':
			return copper;
		case 'Livespace':
			return livespace;
		case 'Monday':
			return monday;
		default:
			return '';
	}
}