import React, { useState } from "react";
import styles from "./EditBackgroundModal.module.scss";
import ReusableModal from "../../ReusableModal";
import CroppingModal from "./CroppingModal";
import { useFreelancerProfileService } from "@services/freelancerProfileService";

interface EditBackgroundModalProps {
  onClose: () => void;
  onSave: (imageData: {
    position: { x: number; y: number };
    imageUrl: string;
  }) => void;
}

const EditBackgroundModal: React.FC<EditBackgroundModalProps> = ({
  onClose,
  onSave,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [croppingVisible, setCroppingVisible] = useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const { deleteBackgroundPicture } = useFreelancerProfileService();

  const handleDelete = async () => {
    try {
      await deleteBackgroundPicture();
      setCroppedImageUrl(null);
      setImageUrl(null);
      alert("Zdjęcie zostało usunięte.");
    } catch (error) {
      console.error("Error deleting background picture:", error);
      alert("Wystąpił błąd podczas usuwania zdjęcia.");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (file.size > 3 * 1024 * 1024) {
      alert("Plik jest za duży! Maksymalny rozmiar to 3 MB.");
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setImageUrl(reader.result as string);
        setCroppingVisible(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (croppedImageUrl) {
      onSave({ position: { x: 0, y: 0 }, imageUrl: croppedImageUrl });
      onClose();
    }
  };

  const handleCroppingClose = () => {
    setCroppingVisible(false);
  };

  const handleEditPicture = () => {
    if (croppedImageUrl) {
      setImageUrl(imageUrl);
      setCroppingVisible(true);
    }
  };

  return (
    <div className={styles.editBackgroundModal__wrapper}>
      <div className={styles.editBackgroundModal__container}>
        <ReusableModal
          title="Edytuj zdjęcie w tle"
          onClose={onClose}
          onSave={handleSave}
        >
          <div className={styles.editBackgroundModal__editArea}>
            {croppedImageUrl ? (
              <div className={styles.editBackgroundModal__preview}>
                <div className={styles.editBackgroundModal__previewText}>
                  <div className={styles.editBackgroundModal__imageHeader}>
                    Zdjęcie w tle (opcjonalnie)
                  </div>
                  <div className={styles.editBackgroundModal__fileName}>
                    {fileName}
                  </div>
                </div>
                <div className={styles.editBackgroundModal__imageWrapper}>
                  <img
                    src={croppedImageUrl}
                    alt="Cropped background"
                    className={styles.editBackgroundModal__previewImage}
                  />
                  <div className={styles.editBackgroundModal__icons}>
                    <span
                      className={styles.editBackgroundModal__icon}
                      onClick={handleEditPicture}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.1278 1.87197C11.5683 1.3136 10.8101 1 10.0197 1C9.22923 1 8.47107 1.3136 7.91158 1.87197L6.78893 2.99462L1.73722 8.04658C1.64539 8.13828 1.58585 8.25736 1.56758 8.38585L1.00605 12.315C0.993871 12.4001 1.00013 12.4868 1.0244 12.5693C1.04867 12.6518 1.09039 12.7281 1.14672 12.7931C1.20306 12.858 1.27269 12.9101 1.35092 12.9458C1.42914 12.9815 1.51412 13 1.6001 13C1.62853 13.0001 1.65693 12.998 1.68507 12.994L5.6145 12.4328C5.74296 12.4142 5.86197 12.3546 5.95377 12.2628L12.1284 6.08876C12.4053 5.8119 12.6249 5.48321 12.7748 5.12145C12.9247 4.75968 13.0018 4.37194 13.0018 3.98037C13.0018 3.58879 12.9247 3.20105 12.7748 2.83929C12.6249 2.47753 12.4053 2.14883 12.1284 1.87197H12.1278ZM5.24648 11.2731L2.30739 11.6927L2.72743 8.75386L7.21335 4.26759L9.73282 6.78687L5.24648 11.2731ZM11.279 5.24028L10.5812 5.93839L8.0616 3.41898L8.76006 2.72046C9.09946 2.3966 9.55056 2.21591 10.0197 2.21591C10.4888 2.21591 10.9399 2.3966 11.2793 2.72046C11.6133 3.05466 11.801 3.50784 11.801 3.98037C11.801 4.4529 11.6131 4.90608 11.279 5.24028Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="0.3"
                        />
                      </svg>
                    </span>
                    <span
                      className={styles.editBackgroundModal__icon}
                      onClick={handleDelete}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.5 2.25C11.5 1.83579 11.1642 1.5 10.75 1.5H8.86201C8.54607 0.60368 7.70037 0.00304687 6.75001 0H5.25001C4.29964 0.00304687 3.45395 0.60368 3.13801 1.5H1.25C0.835789 1.5 0.5 1.83579 0.5 2.25C0.5 2.66421 0.835789 3 1.25 3H1.50001V9.25001C1.50001 10.7688 2.73123 12 4.25 12H7.74999C9.26879 12 10.5 10.7688 10.5 9.25001V3H10.75C11.1642 3 11.5 2.66421 11.5 2.25ZM9.00001 9.25001C9.00001 9.94036 8.44037 10.5 7.75002 10.5H4.25C3.55965 10.5 3.00001 9.94036 3.00001 9.25001V3H9.00001V9.25001Z"
                          fill="currentColor"
                        />
                        <path
                          d="M4.75002 9C5.16423 9 5.50002 8.66421 5.50002 8.25V5.25C5.50002 4.83579 5.16423 4.5 4.75002 4.5C4.3358 4.5 4.00002 4.83579 4.00002 5.25V8.25C4.00002 8.66421 4.3358 9 4.75002 9Z"
                          fill="#75778A"
                        />
                        <path
                          d="M7.25 9C7.66421 9 8 8.66421 8 8.25V5.25C8 4.83579 7.66421 4.5 7.25 4.5C6.83579 4.5 6.5 4.83579 6.5 5.25V8.25C6.5 8.66421 6.83579 9 7.25 9Z"
                          fill="#75778A"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={styles.editBackgroundModal__dropZone}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
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
                  <div className={styles.editBackgroundModal__grabText}>
                    Przeciągnij i upuść plik tutaj aby dodać
                  </div>
                  <div className={styles.editBackgroundModal__dividerContainer}>
                    <hr className={styles.editBackgroundModal__line} />
                    <span className={styles.editBackgroundModal__orText}>
                      lub
                    </span>
                    <hr className={styles.editBackgroundModal__line} />
                  </div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className={styles.editBackgroundModal__import}
                    id="fileInput"
                  />
                  <label
                    htmlFor="fileInput"
                    className={styles.editBackgroundModal__fileButton}
                  >
                    Wybierz z dysku
                  </label>
                </div>
              </div>
            )}
            <footer
              className={styles.editBackgroundModal__imageFormatsContainer}
            >
              <div className={styles.editBackgroundModal__imageFormats}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
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
              </div>
              <p className={styles.editBackgroundModal__imageFormats}>
                {" "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
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
                Zalecany rozmiar: 1320px na 250px
              </p>
            </footer>
          </div>
        </ReusableModal>
        {croppingVisible && imageUrl && (
          <CroppingModal
            imageUrl={imageUrl}
            onClose={handleCroppingClose}
            onSave={({ imageUrl }) => {
              setCroppedImageUrl(imageUrl);
              setCroppingVisible(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default EditBackgroundModal;
