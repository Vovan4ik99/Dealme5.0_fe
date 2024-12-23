import EditButton from "@ui/EditButtonIcon/EditButton/EditButton";
import styles from "./AboutMe.module.scss";
import { useState } from "react";

const AboutMe = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <section className={styles.aboutme__section}>
      <div className={styles.aboutMe__items}>
        <h2 className="title title--fs20">O mnie</h2>
        <EditButton
          className="edit edit--withBorder"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <div className={styles.aboutme__gridContainer}>
        <div className={styles.aboutme__textArea}>
          <h1 className={styles.aboutme__header}>Text 1</h1>
          <p className={styles.aboutme__description}>Description</p>
        </div>
        <div className={styles.aboutme__videoArea}>Video</div>
      </div>
    </section>
  );
};

export default AboutMe;
