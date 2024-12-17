import styles from "./ProfilePage.module.scss";
import Footer from "../../components/layout/Footer/Footer.tsx";
import ProfileNavbar from "../../components/features/FreelancerProfile/ProfileNavbar/ProfileNavbar.tsx";
import BackgroundImage from "../../components/features/FreelancerProfile/ProfileBackgroundImg/BackgroundImage.tsx";
import Avatar from "../../components/features/FreelancerProfile/ProfileAvatarImg/Avatar.tsx";
import FreelancerProfileButtons from "../../components/features/FreelancerProfile/FreelancerProfileButtons/FreelancerProfileButtons.tsx";
import VisibilityBarForClients from "../../components/features/FreelancerProfile/VisibilityBarForClients/VisibilityBarForClients.tsx";
import FreelancerProfileInfo from "../../components/features/FreelancerProfile/FreelancerProfileInfo/FreelancerProfileInfo.tsx";
import Statistics from "../../components/features/FreelancerProfile/Statistics/Statistics.tsx";
import Opinions from "../../components/features/FreelancerProfile/Opinions/Opinions.tsx";
import AboutMe from "../../components/features/FreelancerProfile/AboutMe/AboutMe.tsx";

const ProfilePage = () => {
  return (
    <section className={styles["profile"]}>
      <ProfileNavbar />
      <section className={styles["imageContainer"]}>
        <BackgroundImage />
        <div className={styles["avatar"]}>
          <Avatar />
        </div>
      </section>
      <div className={styles["gridContainer"]}>
        <aside className={styles["profileInfo"]}>
          <FreelancerProfileInfo />
        </aside>
        <div className={styles["rightColumn"]}>
          <FreelancerProfileButtons />
          <VisibilityBarForClients progress={58} />
          <Statistics />
          <AboutMe />
          <Opinions />
        </div>
      </div>
      <Footer isHyphenated={false} isCentered={true} />
    </section>
  );
};

export default ProfilePage;
