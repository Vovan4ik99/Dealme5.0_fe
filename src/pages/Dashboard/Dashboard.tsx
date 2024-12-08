import styles from "./Dashboard.module.scss";
import Navbar from "../../components/layout/Navbar/Navbar.tsx";
import Footer from "../../components/layout/Footer/Footer.tsx";
import UserProfile from "../../components/features/ProfileBackgroundImg/UserProfile.tsx"

const Dashboard = () => {
	return (
		<section className={styles['dashboard']}>
			<Navbar/>
			<UserProfile/>
			<h1 className={'title'}>Strona główna</h1>
			<Footer isHyphenated={false} isCentered={true}/>
		</section>
	);
};

export default Dashboard;