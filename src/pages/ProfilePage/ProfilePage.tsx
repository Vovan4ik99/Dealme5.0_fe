import styles from "./ProfilePage.module.scss";
import Footer from "../../components/layout/Footer/Footer.tsx";
import ProfileNavbar from "../../components/features/FreelancerProfile/ProfileNavbar/ProfileNavbar.tsx";
import BackgroundImage from "../../components/features/FreelancerProfile/ProfileBackgroundImg/BackgroundImage.tsx";
import Avatar from "../../components/features/FreelancerProfile/ProfileAvatarImg/Avatar.tsx";
import FreelancerProfileButtons from "../../components/features/FreelancerProfile/FreelancerProfileButtons/FreelancerProfileButtons.tsx";
import VisibilityBarForClients from "../../components/features/FreelancerProfile/VisibilityBarForClients/VisibilityBarForClients.tsx";
import FreelancerProfileInfo from "../../components/features/FreelancerProfile/FreelancerProfileInfo/FreelancerProfileInfo.tsx";
import Statistics from "../../components/features/FreelancerProfile/Statistics/Statistics.tsx";

const ProfilePage = () => {
	return (
		<section className={styles['profile']}>
			<ProfileNavbar/>
			<div className={styles["imageContainer"]}>
        <BackgroundImage />
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
		  <Statistics />
        </div>
      </div>
			<Footer isHyphenated={false} isCentered={true}/>
		</section>
	);
};

export default ProfilePage;