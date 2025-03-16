export interface IPreviewGalleryModalProps {
	onClose: () => void;
	galleryItems: IGalleryItem[];
	isModalOpened: boolean;
}

export interface IGalleryItem {
	picture: string;
	title: string | undefined;
	description: string | undefined;
}