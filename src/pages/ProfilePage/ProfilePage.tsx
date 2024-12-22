import styles from "./ProfilePage.module.scss";
import Footer from "../../components/layout/Footer/Footer.tsx";
import ProfileNavbar from "../../components/features/FreelancerProfile/ProfileNavbar/ProfileNavbar.tsx";
import BackgroundImage from "../../components/features/FreelancerProfile/BackgroundImage/BackgroundImage.tsx";
import AvatarImage from "../../components/features/FreelancerProfile/AvatarImage/AvatarImage.tsx";
import AsidePrimaryInfo from "../../components/features/FreelancerProfile/AsidePrimaryInfo/AsidePrimaryInfo.tsx";
import Statistics from "../../components/features/FreelancerProfile/Statistics/Statistics.tsx";
import AsideSecondaryInfo from "../../components/features/FreelancerProfile/AsideSecondaryInfo/AsideSecondaryInfo.tsx";
import VisibilityBarForClients from "../../components/features/FreelancerProfile/VisibilityBarForClients/VisibilityBarForClients.tsx";
import SectionTabs from "../../components/features/FreelancerProfile/SectionTabs/SectionTabs.tsx";


const ProfilePage = () => {
  return (
    <section className={styles["profile"]}>
      <ProfileNavbar />
      <section className={styles["imageContainer"]}>
        <BackgroundImage />
        <div className={styles["avatar"]}>
          <AvatarImage />
        </div>
      </section>
      <div className={styles["gridContainer"]}>
        <aside className={styles["profileInfo"]}>
          <AsidePrimaryInfo />
          {/* <AsideSecondaryInfo /> */}
        </aside>

        <div className={styles["rightColumn"]}>
          <SectionTabs />
          <VisibilityBarForClients progress={58} /> 
          <Statistics />
          {/* <AboutMe />
          <Opinions /> */}
        </div>
      </div>
      <Footer isHyphenated={false} isCentered={true} />
    </section>
  );
};

export default ProfilePage;
