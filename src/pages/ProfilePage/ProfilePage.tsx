import styles from "./ProfilePage.module.scss";
import Footer from "../../components/layout/Footer/Footer.tsx";
import ProfileNavbar from "../../components/features/FreelancerProfile/ProfileNavbar/ProfileNavbar.tsx";
import BackgroundImage from "../../components/features/FreelancerProfile/BackgroundImage/BackgroundImage.tsx";

const ProfilePage = () => {
  return (
    <section className={styles["profile"]}>
      <ProfileNavbar />
      <section className={styles["imageContainer"]}>
        <BackgroundImage />
        <div className={styles["avatar"]}>{/* <Avatar /> */}</div>
      </section>
      <Footer isHyphenated={false} isCentered={true} />
    </section>
  );
};

export default ProfilePage;
