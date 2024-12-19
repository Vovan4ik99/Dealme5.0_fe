export interface IImageEditModalProps {
    title: string;
    recommendedSize: string;
    aspect: number;
    onClose: () => void;
    onSave: (imageData: { imageUrl: string }) => void;
    deleteImage?: () => Promise<void>;
    classname: string
  }