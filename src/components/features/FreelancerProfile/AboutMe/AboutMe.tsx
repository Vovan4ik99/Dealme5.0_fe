import styles from "./AboutMe.module.scss";

const AboutMe = () => {
  return (
    <section className={styles.aboutme__section}>
      <h2 className="title title--fs20">O mnie</h2>
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
