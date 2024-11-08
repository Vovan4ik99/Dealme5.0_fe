import {Link} from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import styles from './Navbar.module.scss'
import {useCallback} from "react";

const Navbar = () => {

	const renderContent = useCallback(() => {
		const pathname = location.pathname;
		if (pathname === '/login') {
			return <>
				<p className={styles.navbar__text}>Nie masz konta?</p>
				<Link className={styles.navbar__link} to={'/registration'}>Załóż konto</Link>
			</>
		}
		if (pathname === '/registration') {
			return <>
				<p className={styles.navbar__text}>Masz konto?</p>
				<Link className={styles.navbar__link} to={'/login'}>Zaloguj się</Link>
			</>
		}
	}, [])

	return (
		<nav className={styles.navbar}>
			<Link to={'/'} className={styles.navbar__logo}>
				<img src={logo} alt={'logo'}/>
			</Link>
			<div className={styles.navbar__wrapper}>
				{renderContent()}
			</div>
		</nav>
	)
}

export default Navbar;