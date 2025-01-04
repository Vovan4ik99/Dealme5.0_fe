export interface IImageEditModalProps {
    title: string;
    header: string;
    recommendedSize: string;
    aspect: number;
    onClose: () => void;
    onSave: (imageBlob: Blob) => void;
    deleteImage: () => Promise<void>;
    classname: string;
    initialImage: string | undefined;
    hasBackground?: boolean
  }