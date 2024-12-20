import React, { useEffect, useState } from "react";
import styles from "./EditImageModal.module.scss";
import ReusableModal from "../ReusableModal/ReusableModal";
import CroppingModal from "./CroppingModal";
import {
  edit_click,
  info,
} from "@icons/freelancerProfile/uploadImgModal/uploadImg";
import { IImageEditModalProps } from "./EditImageModalTypes";

const EditImageModal: React.FC<IImageEditModalProps> = ({
  title,
  recommendedSize,
  aspect,
  onClose,
  onSave,
  deleteImage,
  classname,
  initialImage,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [croppedImageBlob, setCroppedImageBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialImage ?? null
  );
  const [croppingVisible, setCroppingVisible] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    if (initialImage) {
      setPreviewUrl(initialImage);

      fetch(initialImage)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "previous_image.jpg", {
            type: blob.type,
          });
          setImageFile(file);
        });
    }
  }, [initialImage]);

  const validateFile = (file: File): boolean => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Nieprawidłowy format pliku. Akceptowalne formaty to: JPG, PNG, WEBP."
      );
      return false;
    }

    if (file.size > 3 * 1024 * 1024) {
      alert("Plik jest za duży! Maksymalny rozmiar to 3 MB.");
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!validateFile(file)) {
      return;
    }

    setFileName(file.name);
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setCroppingVisible(true);
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

  const handleSave = async (croppedBlob: Blob) => {
    console.log("Cropped Blob in EditImageModal:", croppedBlob);
    onSave(croppedBlob);
    onClose();
  };

  const handleDelete = async () => {
    if (deleteImage) {
      try {
        await deleteImage();
        setCroppedImageBlob(null);
        setPreviewUrl(null);
        setImageFile(null);
      } catch (error) {
        console.error("Błąd podczas usuwania obrazu:", error);
      }
    }
  };

  const handleCroppingClose = () => setCroppingVisible(false);

  const handleCroppingSave = (imageData: {
    position: { x: number; y: number };
    blob: Blob | null;
  }) => {
    if (imageData.blob) {
      setCroppedImageBlob(imageData.blob);
      setPreviewUrl(URL.createObjectURL(imageData.blob));
    } else {
      console.error("Blob is null!");
    }
    setCroppingVisible(false);
  };

  return (
    <div className={styles.editModal__wrapper}>
      <div className={styles.editModal__container}>
        <ReusableModal
          title={title}
          onClose={onClose}
          onSave={() => {
            if (croppedImageBlob) {
              handleSave(croppedImageBlob);
            } else {
              console.error("No cropped image available to save");
            }
          }}
        >
          <div className={styles.editModal__editArea}>
            {previewUrl ? (
              <div className={styles.editModal__preview}>
                <div className={styles.editModal__previewText}>
                  <div className={styles.editModal__imageHeader}>
                    Zdjęcie w tle (opcjonalnie)
                  </div>
                  <div className={styles.editModal__fileName}>{fileName}</div>
                </div>
                <div className={styles.editModal__imageWrapper}>
                  <img
                    src={previewUrl}
                    alt="Cropped background"
                    className={classname}
                  />
                  <div className={styles.editModal__icons}>
                    <button
                      className={styles.editModal__icon}
                      onClick={() => {
                        if (imageFile) {
                          setCroppingVisible(true);
                        } else {
                          alert("Brak obrazu do edycji!");
                        }
                      }}
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
                          strokeWidth="0.3"
                        />
                      </svg>
                    </button>
                    <button
                      className={styles.editModal__icon}
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
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <section
                className={styles.editModal__dropZone}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                aria-label="Drop zone for uploading files"
              >
                <div className={styles.editModal__importLayout}>
                  <img src={edit_click} alt="Click to edit" />
                  <div className={styles.editModal__grabText}>
                    Przeciągnij i upuść plik tutaj, aby dodać
                  </div>
                  <div className={styles.editModal__dividerContainer}>
                    <hr className={styles.editModal__line} />
                    <span className={styles.editModal__orText}>lub</span>
                    <hr className={styles.editModal__line} />
                  </div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className={styles.editModal__import}
                    accept="image/jpeg, image/png, image/webp"
                    id="fileInput"
                  />
                  <label
                    htmlFor="fileInput"
                    className={styles.editModal__fileButton}
                  >
                    Wybierz z dysku
                  </label>
                </div>
              </section>
            )}
            <footer className={styles.editModal__items}>
              <p className={styles.editModal__itemAndIcon}>
                <img src={info} alt="Info" />
                Zalecany rozmiar: {recommendedSize}
              </p>
              <div className={styles.editModal__item}>
                Akceptowalne formaty: JPG, PNG, WEBP, rozmiar: do 3MB
              </div>
            </footer>
          </div>
        </ReusableModal>
        {croppingVisible && imageFile && (
          <CroppingModal
            imageUrl={URL.createObjectURL(imageFile)}
            onClose={handleCroppingClose}
            onSave={handleCroppingSave}
            aspect={aspect}
          />
        )}
      </div>
    </div>
  );
};

export default EditImageModal;
