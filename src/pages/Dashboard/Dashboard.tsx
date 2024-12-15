import styles from "./Dashboard.module.scss";
import Navbar from "../../components/layout/OnboardingNavbar/Navbar.tsx";
import Footer from "../../components/layout/Footer/Footer.tsx";
<<<<<<< HEAD
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
=======
import { Link } from "react-router-dom";

const Dashboard = () => {
	return (
		<section className={styles['dashboard']}>
			<Navbar/>
			<Link to={"/profile"}>Profil</Link>
			<h1 className={'title'}>Strona główna</h1>
			<Footer isHyphenated={false} isCentered={true}/>
		</section>
	);
>>>>>>> 71b9568ce691e814d3d622a6b87b29623d2f6a90
};

export default Dashboard;
