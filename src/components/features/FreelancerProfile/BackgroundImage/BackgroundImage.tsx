import { useContext, useEffect, useState } from "react";
import styles from "./BackgroundImage.module.scss";
import EditBackgroundModal from "./EditBackgroundModal";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { useFreelancerProfileService } from "@services/freelancerProfileService";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner";
import BackgroundEmptyState from "../BackgroundEmptyState/BackgroundEmptyState";
import EditButton from "@ui/EditButtonIcon/EditButton/EditButton";

const BackgroundImage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(
    undefined
  );

  const { patchBackgroundPicture, getBackgroundPicture, loadingStatus } =
    useFreelancerProfileService();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await getBackgroundPicture();
        setBackgroundImage(response.pictureData ?? undefined);
      } catch (error) {
        console.error("Error fetching background image:", error);
      }
    };

    fetchBackgroundImage();
  }, [getBackgroundPicture]);

  if (loadingStatus === "loading") {
    return <LoadingSpinner />;
  }
  const handleSaveBackground = async (imageBlob: Blob) => {
    console.log("Received Blob in handleSaveBackground:", imageBlob);
    try {
      if (!user?.id) {
        console.error("Freelancer ID is undefined");
        return;
      }

      // Tworzenie FormData
      const formData = new FormData();
      formData.append("file", imageBlob, "background.jpg"); // Sprawdź, czy imageBlob jest poprawnym Blob
      console.log("FormData to send:", formData);
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      await patchBackgroundPicture(formData); // Wyślij dane jako FormData
      setBackgroundImage(URL.createObjectURL(imageBlob)); // Ustaw URL podglądu
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving background image:", error);
    }
  };

  const handleDeleteBackground = () => {
    setBackgroundImage(undefined); 
  };

  const onClose = () => setIsModalOpen(false);

  return (
    <div className={styles.backgroundImg__wrapper}>
      {backgroundImage ? (
        <div className={styles.backgroundImg__items}>
          <img
            src={backgroundImage}
            alt="Background"
            className={styles.backgroundImg__image}
          />
          <EditButton
            className={styles.backgroundImg__icon}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      ) : (
        <BackgroundEmptyState onEditClick={() => setIsModalOpen(true)} />
      )}
      {isModalOpen && (
        <EditBackgroundModal
          onClose={onClose}
          onSave={handleSaveBackground}
          onDelete={handleDeleteBackground}
          classname={styles.backgroundImg__previewImage}
          initialImage={backgroundImage}
        />
      )}
    </div>
  );
};

export default BackgroundImage;
