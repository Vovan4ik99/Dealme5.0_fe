export const API_ROUTES = {
	AUTH: {
		LOGIN: '/auth/login',
		REGISTER: '/auth/register',
		REGISTER_INVESTOR: '/auth/register/investor',
		REGISTER_FREELANCER: '/auth/register/freelancer',
		GET_INVESTOR_AUTH_TOKEN: '/auth/start',
	},
	TOKEN: {
		PASSWORD_RESET: '/token-reset/send-email',
	},
	USER: {
		FREELANCER_PROFILE: '/freelancer/me',
		INVESTOR_PROFILE: '/investor/me'
	},
	ONBOARDING: {
		FREELANCER: {
			PATCH_EXPERIENCE_LEVEL: '/freelancer/me/experienceLevel',
			GET_SPECIALIZATIONS: '/specialization',
			PATCH_SPECIALIZATION: '/specialization/freelancer',
			PARCH_WORKING_DAYS: '/freelancer/me/workingDays',
			GET_WORKING_HOURS: '/workingHours',
			PATCH_WORKING_HOURS: '/freelancer/me/workingHours',
			GET_INCOME_GOALS: '/incomeGoals',
			PATCH_INCOME_GOALS: '/freelancer/me/incomeGoal',
			GET_INDUSTRIES: '/industries',
			PATCH_SUB_INDUSTRIES: '/freelancer/me/industries',
			GET_TYPES_OF_SALES: '/typeOfSales',
			PATCH_TYPES_OF_SALES: '/freelancer/me/typeOfSales',
			GET_SECTORS: '/sectors',
			PATCH_SECTORS: '/sector/freelancer',
			GET_ACTIVITIES: '/activities',
			PATCH_ACTIVITIES: '/freelancer/me/activities',
			SALES_TOOLS: '/tools',
			FREELANCER_SALES_TOOLS: '/freelancer/tools',
			ONBOARDING_STATUS: '/onboarding ',
		}
	},
	PROFILE: {
		FREELANCER: {
			BACKGROUND_PICTURE: '/freelancer/backgroundPicture',
			AVATAR: '/user/avatar',
			INFO: '/freelancer/bar',
			PATCH_NAME: '/freelancer/me/name',
			PATCH_COMPANY: '/freelancer/me/company',
			PATCH_LOCALIZATION: '/freelancer/me/localization',
			GET_COUNTRIES: '/countries',
			GET_STATES: '/states',
			PATCH_WORKING_AREA: '/freelancer/me/localization/workingArea',
			GET_LANGUAGES: '/languages',
			GET_PROFILE_PROGRESS: '/complete/freelancer/me',
			GET_ABOUT_ME_INFO: '/about/freelancer',
			PATCH_ABOUT_ME_INFO: '/about',
			GET_FREELANCER_CERTIFICATES: '/certificate/freelancer',
			ADD_FREELANCER_CERTIFICATE: '/certificate/freelancer',
			GET_VIDEO: '/video/freelancer',
			ADD_VIDEO: '/video',
			GET_REVIEWS: '/opinions/freelancer',
			WORK_EXPERIENCE: '/workExperience/freelancer',
			ADD_ACTIVITY: '/freelancer/me/activity',
			EDUCATION: '/freelancer/education',
			GET_ACTIVITIES: '/activities/freelancer',
			PORTFOLIO: '/freelancer/portfolios',
		}
	}
} as const;