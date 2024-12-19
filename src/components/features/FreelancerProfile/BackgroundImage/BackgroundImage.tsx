import { useContext, useEffect, useState } from "react";
import styles from "./BackgroundImage.module.scss";
import EditBackgroundModal from "./EditBackgroundModal";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { useFreelancerProfileService } from "@services/freelancerProfileService";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner";

const BackgroundImage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);

  const { patchBackgroundPicture, getBackgroundPicture, loadingStatus } = useFreelancerProfileService();
  const { user } = useContext(AuthContext);

  console.log(user);

	useEffect(() => {
		if (backgroundImage === null) {
			getBackgroundPicture()
				.then(
					(response) =>
						setBackgroundImage(response.pictureData !== undefined ? response.pictureData : undefined)
				).catch((error) => console.log(error));
		}
	}, [backgroundImage, getBackgroundPicture]);

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>
	}

  const handleSaveBackground = async (imageData: { imageUrl: string }) => {
try {
  if (!user?.id) {
    console.error("Freelancer ID is undefined");
    return;
  }
      setBackgroundImage(imageData.imageUrl);
      await patchBackgroundPicture({
        pictureData: imageData.imageUrl
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving background image:", error);
    }
    console.log(backgroundImage)
  };

  const onClose = () => setIsModalOpen(false);

  return (
    <div className={styles.backgroundImg__wrapper}>
      <div className={styles.backgroundImg__items}>
        <img
          src={backgroundImage ?? ""}
          alt="Background"
          className={styles.backgroundImg__image}
        />
        <button
          className={styles.backgroundImg__icon}
          onClick={() => setIsModalOpen(true)}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1278 1.87197C11.5683 1.3136 10.8101 1..."
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.3"
            />
          </svg>
        </button>
      </div>
      {isModalOpen && (
        <EditBackgroundModal
          onClose={onClose}
          onSave={handleSaveBackground}
          classname={styles.backgroundImg__previewImage}
        />
      )}
    </div>
  );
};

export default BackgroundImage;
