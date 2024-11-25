import pipedrive from '@icons/sales-tools/pipedrive.svg';
import salesforce from '@icons/sales-tools/salesforce.svg';
import hubspot from '@icons/sales-tools/hubspot.svg';
import zoho from '@icons/sales-tools/zoho.svg';
import msc from '@icons/sales-tools/msc_dynamics_365.svg';
import copper from '@icons/sales-tools/copper.svg';
import livespace from '@icons/sales-tools/livespace.svg';
import monday from '@icons/sales-tools/monday.svg';

//It is workaround, because backend does not have logic for servicing tools images
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
			return msc;
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