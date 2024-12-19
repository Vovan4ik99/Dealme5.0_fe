export interface IImageEditModalProps {
    title: string;
    recommendedSize: string;
    aspect: number;
    onClose: () => void;
    onSave: (imageBlob: Blob) => void;
    deleteImage?: () => Promise<void>;
    classname: string
  }