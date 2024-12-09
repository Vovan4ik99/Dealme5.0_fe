import React, { useState } from "react";
import styles from "./EditBackgroundModal.module.scss";
import ReusableModal from "../ReusableModal";

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
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!dragging) return;

    const { movementX, movementY } = e;
    setPosition((prev) => ({
      x: prev.x + movementX,
      y: prev.y + movementY,
    }));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 3 * 1024 * 1024) {
        alert("Plik jest za duży! Maksymalny rozmiar to 3 MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImageUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = () => setDragging(true);

  const handleMouseUp = () => setDragging(false);

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
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!imageUrl) return;
    onSave({ position, imageUrl });
    onClose();
  };

  return (
    <ReusableModal
      title="Edytuj zdjęcie w tle"
      onClose={onClose}
      onSave={handleSave}
    >
      <div className={styles.editArea}>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={styles.importLayout}
        >
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

          <div className={styles.grabText}>
            Przeciągnij i upuść plik tutaj aby dodać
          </div>
          <div className={styles.dividerContainer}>
            <hr className={styles.line} />
            <span className={styles.orText}>lub</span>
            <hr className={styles.line} />
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            className={styles.import}
            id="fileInput"
          />
          <label htmlFor="fileInput" className={styles.fileButton}>
            Wybierz z dysku
          </label>
          {imageUrl && (
            <div
              className={styles.editableImage}
              style={{
                backgroundImage: `url(${imageUrl})`,
                transform: `translate(${position.x}px, ${position.y}px)`,
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleDrag}
              onMouseUp={handleMouseUp}
            ></div>
          )}
        </div>
        <footer className={styles.imageFormats}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 0C3.1402 0 0 3.14024 0 7.00004C0 10.8598 3.1402 14 7 14C10.8598 14 14 10.8598 14 7.00004C14 3.14024 10.8598 0 7 0ZM7 12.7273C3.84194 12.7273 1.27273 10.1581 1.27273 7.00004C1.27273 3.84202 3.84194 1.27273 7 1.27273C10.1581 1.27273 12.7273 3.84202 12.7273 7.00004C12.7273 10.1581 10.158 12.7273 7 12.7273Z"
              fill="#75778A"
            />
            <path
              d="M6.99992 2.9697C6.53215 2.9697 6.1516 3.3505 6.1516 3.81856C6.1516 4.28621 6.53215 4.66667 6.99992 4.66667C7.46769 4.66667 7.84823 4.28621 7.84823 3.81856C7.84823 3.3505 7.46769 2.9697 6.99992 2.9697Z"
              fill="#75778A"
            />
            <path
              d="M7 5.93939C6.64856 5.93939 6.36364 6.22432 6.36364 6.57576V10.3939C6.36364 10.7454 6.64856 11.0303 7 11.0303C7.35144 11.0303 7.63636 10.7454 7.63636 10.3939V6.57576C7.63636 6.22432 7.35144 5.93939 7 5.93939Z"
              fill="#75778A"
            />
          </svg>
          Akceptowalne formaty: JPG, PNG, WEBP, rozmiar: do 3MB
        </footer>
      </div>
    </ReusableModal>
  );
};

export default EditBackgroundModal;
