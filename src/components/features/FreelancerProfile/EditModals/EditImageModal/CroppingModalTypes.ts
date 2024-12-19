export interface ICroppingModalProps {
    imageUrl: string;
    onClose: () => void;
    onSave: (imageData: {
      position: { x: number; y: number };
      imageUrl: string | null;
    }) => void;
    aspect?: number;
  }