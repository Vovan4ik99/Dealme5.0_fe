export interface ICroppingModalProps {
    imageUrl: string;
    onClose: () => void;
    onSave: (imageData: {
      position: { x: number; y: number };
      blob: Blob | null;
    }) => void;
    aspect?: number;
  }