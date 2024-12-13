import styles from "./Dashboard.module.scss";
import Navbar from "../../components/layout/Navbar/Navbar.tsx";
import Footer from "../../components/layout/Footer/Footer.tsx";
import UserProfile from "../../components/features/ProfileBackgroundImg/UserProfile.tsx";
import Avatar from "../../components/features/ProfileAvatarImg/Avatar.tsx";
import FreelancerProfileInfo from "../../components/features/freelancerProfileInfo/FreelancerProfileInfo.tsx";
import FreelancerProfileButtons from "../../components/features/FreelancerProfileButtons/FreelancerProfileButtons.tsx";
import VisibilityBarForClients from "../../components/features/VisibilityBarForClients/VisibilityBarForClients.tsx";

const Dashboard = () => {
  return (
    <section className={styles["dashboard"]}>
      <Navbar />
      <div className={styles["imageContainer"]}>
        <UserProfile />
        <div className={styles["avatar"]}>
          <Avatar />
        </div>
      </div>
      <div className={styles["gridContainer"]}>
        <div className={styles["profileInfo"]}>
          <FreelancerProfileInfo />
        </div>
        <div className={styles["rightColumn"]}>
          <FreelancerProfileButtons />
          <VisibilityBarForClients progress={58} />
        </div>
      </div>

      <h1 className={"title"}>Strona główna</h1>
      <Footer isHyphenated={false} isCentered={true} />
    </section>
  );
};

export default Dashboard;
