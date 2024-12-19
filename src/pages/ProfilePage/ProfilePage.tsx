import styles from "./ProfilePage.module.scss";
import Footer from "../../components/layout/Footer/Footer.tsx";
import ProfileNavbar from "../../components/features/FreelancerProfile/ProfileNavbar/ProfileNavbar.tsx";
import BackgroundImage from "../../components/features/FreelancerProfile/BackgroundImage/BackgroundImage.tsx";

const ProfilePage = () => {
	return (
		<section className={styles['profile']}>
			<ProfileNavbar/>
			<h1 className={'title'}>Strona</h1>
			<BackgroundImage />
			<Footer isHyphenated={false} isCentered={true}/>
		</section>
	);
};

export default ProfilePage;