import React, { useCallback, useState } from "react";
import styles from "./EditBackgroundModal.module.scss";
import ReusableModal from "../ReusableModal";
import getCroppedImg from "./getCroppedImg";
import CroppingModal from "./CroppingModal";

interface EditBackgroundModalProps {
  onClose: () => void;
  onSave: (imageData: {
    position: { x: number; y: number };
    imageUrl: string;
  }) => void;
}

interface Position {
  x: number;
  y: number;
}

const EditBackgroundModal: React.FC<EditBackgroundModalProps> = ({
  onClose,
  onSave,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [croppingVisible, setCroppingVisible] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.size > 3 * 1024 * 1024) {
        alert("Plik jest za duży! Maksymalny rozmiar to 3 MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImageUrl(reader.result as string);
          setCroppingVisible(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (imageUrl) {
      try {
        const croppedImage = await getCroppedImg(imageUrl, { x: 0, y: 0 });
        onSave({ position: { x: 0, y: 0 }, imageUrl: croppedImage });
        onClose();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleCroppingClose = () => {
    setCroppingVisible(false);
  };

  return (
    <div className={styles.editBackgroundModal__wrapper}>
      <div
        className={styles.editBackgroundModal__container}
      >
        <ReusableModal
          title="Edytuj zdjęcie w tle"
          onClose={onClose}
          onSave={handleSave}
        >
          <div className={styles.editBackgroundModal__editArea}>
            <div className={styles.editBackgroundModal__importLayout}>
              <svg
                width="26"
                height="25"
                viewBox="0 0 26 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0994 13.3199L25.2156 18.0539L21.7507 19.0446L24.2273 23.3346L22.2087 24.5L19.7322 20.2112L17.1414 22.7169L17.0994 13.3199ZM14.7685 5.16178H17.0994V7.49267H22.9267C23.2357 7.49267 23.5322 7.61546 23.7507 7.83401C23.9693 8.05258 24.0921 8.34901 24.0921 8.65811V13.3199H21.7612V9.82356H10.1068V21.478H14.7685V23.8089H8.94132C8.63222 23.8089 8.33578 23.6861 8.11722 23.4675C7.89866 23.249 7.77587 22.9525 7.77587 22.6434V16.8162H5.44498V14.4853H7.77587V8.65811C7.77587 8.34901 7.89866 8.05258 8.11722 7.83401C8.33578 7.61546 8.63222 7.49267 8.94132 7.49267H14.7685V5.16178ZM3.11409 14.4853V16.8162H0.783203V14.4853H3.11409ZM3.11409 9.82356V12.1544H0.783203V9.82356H3.11409ZM3.11409 5.16178V7.49267H0.783203V5.16178H3.11409ZM3.11409 0.5V2.83089H0.783203V0.5H3.11409ZM7.77587 0.5V2.83089H5.44498V0.5H7.77587ZM12.4376 0.5V2.83089H10.1068V0.5H12.4376ZM17.0994 0.5V2.83089H14.7685V0.5H17.0994Z"
                  fill="#0D1033"
                />
              </svg>
              <div className={styles.editBackgroundModal__importLayout__grabText}>
                Przeciągnij i upuść plik tutaj aby dodać
              </div>
              <div className={styles.editBackgroundModal__importLayout__dividerContainer}>
                <hr className={styles.editBackgroundModal__importLayout__dividerContainer__line} />
                <span className={styles.editBackgroundModal__importLayout__dividerContainer__orText}>lub</span>
                <hr className={styles.editBackgroundModal__importLayout__dividerContainer__line} />
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                className={styles.editBackgroundModal__importLayout__import}
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className={styles.editBackgroundModal__importLayout__fileButton}
              >
                Wybierz z dysku
              </label>
            </div>
            <footer className={styles.editBackgroundModal__imageFormats}>
              Akceptowalne formaty: JPG, PNG, WEBP, rozmiar: do 3MB
            </footer>
          </div>
        </ReusableModal>
        {croppingVisible && imageUrl && (
          <CroppingModal
            imageUrl={imageUrl}
            onClose={handleCroppingClose}
            onSave={onSave}
          />
        )}
      </div>
    </div>
  );
};

export default EditBackgroundModal;
