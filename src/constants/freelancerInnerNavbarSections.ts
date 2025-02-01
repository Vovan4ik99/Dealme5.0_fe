export const NAVBAR_SECTIONS = {
	about: 'O mnie',
	certifications: 'Certyfikaty i licencje',
	tools: 'Narzędzia sprzedażowe',
	experience: 'Doświadczenie',
	education: 'Wykształcenie',
	videos: 'Wideo',
	services: 'Usługi',
	skills: 'Umiejętności',
} as const;

export type NavbarSectionKey = keyof typeof NAVBAR_SECTIONS;