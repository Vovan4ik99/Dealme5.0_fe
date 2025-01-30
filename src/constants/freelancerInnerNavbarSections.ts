export const NAVBAR_SECTIONS = {
	about: 'O mnie',
	certifications: 'Certyfikaty i licencje',
	experience: 'Doświadczenie',
	education: 'Wykształcenie',
	tools: 'Narzędzia sprzedażowe',
	videos: 'Wideo',
	services: 'Usługi',
	skills: 'Umiejętności',
} as const;

export type NavbarSectionKey = keyof typeof NAVBAR_SECTIONS;