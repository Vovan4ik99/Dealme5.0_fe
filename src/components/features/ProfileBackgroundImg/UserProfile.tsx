import React, { useState } from "react";
import styles from "./UserProfile.module.scss";
import EditBackgroundModal from "./EditBackgroundModal"

const UserProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className={styles.userProfile}>
      <div className={styles.profileHeader}>
        <img
          src="/path/to/background.jpg"
          alt="Background"
          className={styles.backgroundImage}
        />
        <button className={styles.editBtn} onClick={() => setIsModalOpen(true)}>
          Edytuj
        </button>
      </div>
      {isModalOpen && (
        <EditBackgroundModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default UserProfile;
