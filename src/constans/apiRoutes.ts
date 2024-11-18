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
			SPECIALIZATION: '/specialization',
		}

	}
}