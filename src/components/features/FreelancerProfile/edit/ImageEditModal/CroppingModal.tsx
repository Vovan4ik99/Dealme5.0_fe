import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import styles from "./CroppingModal.module.scss";
import ReusableModal from "../ReusableModal/ReusableModal";
import getCroppedImg from "./getCroppedImg";

interface CroppingModalProps {
  imageUrl: string;
  onClose: () => void;
  onSave: (imageData: {
    position: { x: number; y: number };
    imageUrl: string | null;
  }) => void;
  aspect?: number;
}

const CroppingModal: React.FC<CroppingModalProps> = ({
  imageUrl,
  onClose,
  onSave,
  aspect
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

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
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            cropAreaStyle: {
              borderRadius: "16px",
            },
          }}
        />
      </div>
    </ReusableModal>
  );
};

export default CroppingModal;
