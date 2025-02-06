export const NAVBAR_SECTIONS = {
	about: 'O mnie',
	certifications: 'Certyfikaty i licencje',
	tools: 'Narzędzia sprzedażowe',
	videos: 'Wideo',
	services: 'Usługi',
	portfolio: 'Portfolio',
	reviews: 'Opinie',
	experience: 'Doświadczenie',
	education: 'Wykształcenie',
} as const;

export type NavbarSectionKey = keyof typeof NAVBAR_SECTIONS;