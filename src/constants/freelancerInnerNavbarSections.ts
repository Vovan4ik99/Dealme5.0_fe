export const NAVBAR_SECTIONS = {
	about: 'O mnie',
	certifications: 'Certyfikaty i licencje',
	tools: 'Narzędzia sprzedażowe',
	videos: 'Wideo',
	services: 'Usługi',
	experience: 'Doświadczenie',
	education: 'Wykształcenie',
	skills: 'Umiejętności',
} as const;

export type NavbarSectionKey = keyof typeof NAVBAR_SECTIONS;