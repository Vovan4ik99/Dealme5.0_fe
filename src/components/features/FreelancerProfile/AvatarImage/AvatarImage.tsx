import { useContext, useEffect, useState } from "react";
import styles from "./AvatarImage.module.scss";
import EditAvatarImage from "./EditAvatarImage";
import { AuthContext } from "@context/AuthContext/AuthContext";
import { useFreelancerProfileService } from "@services/freelancerProfileService";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner";
import EditButton from "@ui/EditButtonIcon/EditButton/EditButton";
import AvatarEmptyState from "../AvatarEmptyState/AvatarEmptyState";

const AvatarImage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [avatarImage, setAvatarImage] = useState<string | undefined>(undefined);

  const { patchAvatar, getAvatar, loadingStatus } =
    useFreelancerProfileService();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAvatarImage = async () => {
      try {
        const response = await getAvatar();
        setAvatarImage(response.picture ?? undefined);
      } catch (error) {
        console.error("Error fetching avatar image:", error);
      }
    };

    fetchAvatarImage();
  }, [getAvatar]);

  if (loadingStatus === "loading") {
    return <LoadingSpinner />;
  }

  const handleSaveAvatar = async (imageBlob: Blob) => {
    console.log("Received Blob in handleSaveAvatar:", imageBlob);
    try {
      if (!user?.id) {
        console.error("Freelancer ID is undefined");
        return;
      }
      // Tworzenie FormData
      const formData = new FormData();
      formData.append("file", imageBlob, "avatar.jpg"); // Sprawdź, czy imageBlob jest poprawnym Blob
      console.log("FormData to send:", formData);
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      await patchAvatar(formData); // Wyślij dane jako FormData
      setAvatarImage(URL.createObjectURL(imageBlob)); // Ustaw URL podglądu
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving avatar image:", error);
    }
  };

  const handleDeleteAvatar = () => {
    setAvatarImage(undefined);
  };

  const onClose = () => setIsModalOpen(false);

  return (
    <div className={styles.avatarImg__wrapper}>
        {avatarImage ? (
      <div className={styles.avatarImg__items}>
        <img
          src={avatarImage}
          alt="Avatar"
          className={styles.avatarImg__image}
        />
        <EditButton
          className={styles.avatarImg__icon}
          onClick={() => setIsModalOpen(true)}
        />
        <div className={styles.avatarImg__dealmeLogo}>
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.95674 5.17418C5.25923 5.17418 4.69389 5.73952 4.69389 6.43704C4.69389 7.13437 5.25923 7.69971 5.95674 7.69971C6.65426 7.69971 7.2196 7.13437 7.2196 6.43704C7.2196 5.73952 6.65426 5.17418 5.95674 5.17418Z"
              fill="#00C3DF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.67292 10.4913L5.96931 10.4911C5.96875 10.4911 5.96818 10.4913 5.9678 10.4913C5.96724 10.4913 5.96667 10.4911 5.96629 10.4911H5.95667C5.2397 10.4894 4.59127 10.3134 4.01102 9.96163C3.42679 9.6089 2.96492 9.1257 2.62712 8.51334C2.28837 7.90099 2.11861 7.21215 2.11861 6.44855C2.11861 5.66983 2.28837 4.97477 2.62712 4.36165C2.96492 3.7493 3.42679 3.26609 4.01102 2.91337C4.5943 2.5597 5.24631 2.38277 5.9678 2.38277C6.70233 2.38277 7.35869 2.5597 7.93498 2.91337C8.51127 3.26609 8.9654 3.7493 9.29697 4.36165C9.62874 4.97477 9.7949 5.66983 9.7949 6.44855V10.4911H9.70786L9.67292 10.4913ZM8.99429 1.22679C8.10039 0.700722 7.09207 0.4375 5.9678 0.4375C4.84335 0.4375 3.83069 0.700722 2.9298 1.22679C2.02873 1.75285 1.31516 2.47001 0.789099 3.37788C0.262089 4.28594 0 5.31012 0 6.44855C0 7.58697 0.24094 8.60757 0.723954 9.5077C1.20697 10.4086 1.86597 11.1221 2.70265 11.6482C3.53858 12.1752 4.4827 12.4375 5.53483 12.4375C7.21461 12.4375 11.9135 12.3731 11.9135 12.3731V6.44855C11.9135 5.31012 11.6505 4.28594 11.1244 3.37788C10.5984 2.47001 9.88818 1.75285 8.99429 1.22679Z"
              fill="#00C3DF"
            />
          </svg>
        </div>
      </div>
            ) : (
                <AvatarEmptyState onEditClick={() => setIsModalOpen(true)} />
              )}
      {isModalOpen && (
        <EditAvatarImage
          onClose={onClose}
          onSave={handleSaveAvatar}
          onDelete={handleDeleteAvatar}
          classname={styles.avatarImg__previewImage}
          initialImage={avatarImage}
        />
      )}
    </div>
  );
};

export default AvatarImage;