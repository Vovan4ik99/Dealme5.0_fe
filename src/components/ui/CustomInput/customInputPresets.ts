import {CustomInputProps, PresetType} from "@ui/CustomInput/customInputTypes.ts";
import {CUSTOM_INPUT_VALIDATION_RULES} from "@ui/CustomInput/customInputValidationRules.ts";

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
	}
} as const;