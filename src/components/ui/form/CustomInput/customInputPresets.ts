import { CustomInputProps, PresetType } from "@ui/form/CustomInput/customInputTypes.ts";
import { CUSTOM_INPUT_VALIDATION_RULES } from "@ui/form/CustomInput/customInputValidationRules.ts";

export const CUSTOM_INPUT_PRESETS: Record<PresetType, Partial<CustomInputProps>> = {
	email: {
		id: 'email',
		type: 'email',
		placeholder: 'example@email.com',
		autoComplete: 'email',
		labelText: 'E-mail',
		validation: CUSTOM_INPUT_VALIDATION_RULES.email
	},
	password: {
		id: 'password',
		type: 'password',
		placeholder: 'Wpisz hasło',
		autoComplete: 'current-password',
		labelText: 'Hasło',
		validation: CUSTOM_INPUT_VALIDATION_RULES.password
	},
	firstName: {
		id: 'firstName',
		type: 'text',
		placeholder: 'np. Jan',
		autoComplete: 'given-name',
		labelText: 'Imię',
		validation: CUSTOM_INPUT_VALIDATION_RULES.firstName
	},
	lastName: {
		id: 'lastName',
		type: 'text',
		placeholder: 'np. Kowalski',
		autoComplete: 'family-name',
		labelText: 'Nazwisko',
		validation: CUSTOM_INPUT_VALIDATION_RULES.lastName
	},
	company: {
		id: 'company',
		type: 'text',
		placeholder: 'np. Dealme',
		autoComplete: 'organization',
		labelText: 'Firma w której pracujesz (opcjonalne)',
		validation: CUSTOM_INPUT_VALIDATION_RULES.company
	},
	certificateName: {
		id: 'name',
		type: 'text',
		placeholder: 'np. Certyfikat ukończenia szkolenia z Marketingu',
		autoComplete: '',
		labelText: 'Nazwa certyfikatu',
		validation: CUSTOM_INPUT_VALIDATION_RULES.certificateName
	},
	certificateOrganization: {
		id: 'info',
		type: 'text',
		placeholder: 'np. np. Uniwersytet Adama Mickiewicza',
		autoComplete: '',
		labelText: 'Wydany przez',
		validation: CUSTOM_INPUT_VALIDATION_RULES.certificateOrganization
	},
	videoTitle: {
		id: 'title',
		type: 'text',
		placeholder: 'Np moje wideo',
		autoComplete: '',
		labelText: 'Nazwa / Komentarz',
		validation: CUSTOM_INPUT_VALIDATION_RULES.videoTitle
	},
	jobTitle: {
		id: 'jobTitle',
		type: 'text',
		placeholder: 'np. Project manager',
		autoComplete: '',
		labelText: 'Nazwa stanowiska',
		validation: CUSTOM_INPUT_VALIDATION_RULES.jobTitle
	},
	workExperienceCompany: {
		id: 'companyName',
		type: 'text',
		placeholder: 'np. Sales Agency',
		autoComplete: '',
		labelText: 'Nazwa firmy',
		validation: CUSTOM_INPUT_VALIDATION_RULES.workExperienceCompany
	},
	city: {
		id: 'city',
		type: 'text',
		placeholder: 'Wpisz',
		autoComplete: '',
		labelText: 'Nazwa miasta',
		validation: CUSTOM_INPUT_VALIDATION_RULES.city
	}
} as const;