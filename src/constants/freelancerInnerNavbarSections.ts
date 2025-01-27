export const NAVBAR_SECTIONS = {
	about: 'O mnie',
	experience: 'Doświadczenie',
	education: 'Wykształcenie',
	certifications: 'Certyfikaty i licencje',
	tools: 'Narzędzia sprzedażowe',
	videos: 'Wideo',
	services: 'Usługi',
	skills: 'Umiejętności',
} as const;

export type NavbarSectionKey = keyof typeof NAVBAR_SECTIONS;