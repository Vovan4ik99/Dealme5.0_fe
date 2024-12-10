import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import styles from "./CroppingModal.module.scss";
import ReusableModal from "../ReusableModal";
import getCroppedImg from "./getCroppedImg";

interface CroppingModalProps {
  imageUrl: string;
  onClose: () => void;
  onSave: (imageData: {
    position: { x: number; y: number };
    imageUrl: string;
  }) => void;
}

const CroppingModal: React.FC<CroppingModalProps> = ({
  imageUrl,
  onClose,
  onSave,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | {
    width: number;
    height: number;
    x: number;
    y: number;
  }>(null);

  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
        onSave({ position: { x: 0, y: 0 }, imageUrl: croppedImage });
        onClose();
      } catch (error) {
        console.error("Error cropping image:", error);
      }
    }
  };

  return (
    <ReusableModal
      title="Przytnij obrazek"
      onClose={onClose}
      onSave={handleSave}
      width="800px"
    >
      <div className={styles.cropperContainer}>
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={16 / 9}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          
        />
        <div className={styles.controls}>
          <label>Zoom</label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>
      </div>
    </ReusableModal>
  );
};

export default CroppingModal;
