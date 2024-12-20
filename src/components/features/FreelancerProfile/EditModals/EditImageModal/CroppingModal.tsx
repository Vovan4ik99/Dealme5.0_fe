import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import styles from "./CroppingModal.module.scss";
import getCroppedImg from "./getCroppedImg";
import { ICroppingModalProps } from "./CroppingModalTypes";
import ReusableModal from "../ReusableModal/ReusableModal";

const CroppingModal: React.FC<ICroppingModalProps> = ({
  imageUrl,
  onClose,
  onSave,
  aspect,
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
        const croppedBlob = await getCroppedImg(imageUrl, croppedAreaPixels);
        console.log("Cropped Blob:", croppedBlob);
        onSave({
          position: { x: crop.x, y: crop.y },
          blob: croppedBlob,
        });
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
