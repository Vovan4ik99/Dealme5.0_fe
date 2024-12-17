export const API_ROUTES = {
	AUTH: {
		LOGIN: '/auth/login',
		REGISTER: '/auth/register',
		REGISTER_INVESTOR: '/auth/register/investor',
		REGISTER_FREELANCER: '/auth/register/freelancer'
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
			GET_SALES_TOOLS: '/tools',
			PATCH_SALES_TOOLS: '/freelancer/tools',
		}
	},
	PROFILE: {
		FREELANCER: {
			BACKGROUND_PICTURE: '/freelancer/backgroundPicture',
			AVATAR: '/user/avatar',
			INFO: '/freelancer/bar'
		}
	}
} as const;