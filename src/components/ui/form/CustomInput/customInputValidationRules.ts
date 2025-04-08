import { PresetType } from "@ui/form/CustomInput/customInputTypes.ts";
import { RegisterOptions } from "react-hook-form";

export const CUSTOM_INPUT_VALIDATION_RULES: Record<PresetType, RegisterOptions> = {
	email: {
		required: 'Podaj email',
		pattern: {
			value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
			message: 'Podaj poprawny adres email',
		},
	},
	password: {
		required: 'Podaj hasło',
		pattern: {
			value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
			message: "Hasło musi zawierać minimum jedną wielką literę, " +
				"jedną małą literę, jedną cyfrę oraz jeden znak specjalny (@$!%*?&)"
		},
		min: {
			value: 8,
			message: 'Hasło musi zawierać minimum 8 znaków',
		},
	},
	firstName: {
		required: 'Podaj imię',
		pattern: {
			value: /^[A-ZА-ЯЁĆŁŃÓŚŹŻ][a-zа-яёćłńóśźż]*$/,
			message: "Imię powinno zaczynać się wielką literą i zawierać tylko litery"
		},
		min: {
			value: 2,
			message: 'Długość od 2 do 30 znaków',
		},
		max: {
			value: 30,
			message: 'Długość od 2 do 30 znaków',
		}
	},
	lastName: {
		required: 'Podaj nazwisko',
		pattern: {
			value: /^[A-ZА-ЯЁĆŁŃÓŚŹŻ][a-zа-яёćłńóśźż]*(?:-[A-ZА-ЯЁĆŁŃÓŚŹŻ][a-zа-яёćłńóśźż]*)?$/,
			message: 'Nazwisko powinno zaczynać się wielką literą i może zawierać tylko litery' +
				' oraz jeden łącznik',
		},
		min: {
			value: 2,
			message: 'Długość od 2 do 50 znaków'
		},
		max: {
			value: 50,
			message: 'Długość od 2 do 50 znaków'
		}
	},
	company: {},
	certificateName: {
		required: 'Podaj nazwę certyfikatu / licencji',
		max: {
			value: 50,
			message: 'Długość od 2 do 50 znaków'
		}
	},
	certificateOrganization: {
		required: 'Podaj informacje o wydawcy',
		max: {
			value: 50,
			message: 'Długość od 2 do 50 znaków'
		}
	},
	videoTitle: {
		required: 'Podaj nazwę video / komentarz',
		max: {
			value: 50,
			message: 'Długość od 2 do 50 znaków'
		}
	},
	jobTitle: {
		required: 'Podaj nazwę stanowiska',
		max: {
			value: 50,
			message: 'Długość od 2 do 50 znaków'
		}
	},
	workExperienceCompany: {
		required: 'Podaj nazwę firmy w której pracowałeś / aś',
		max: {
			value: 50,
			message: 'Długość od 2 do 50 znaków'
		}
	}
} as const;