import {Link} from "react-router-dom";
import logo from "@icons/logo.svg";
import styles from './Navbar.module.scss'
import {useCallback, useContext} from "react";
import {AuthContext} from "@context/AuthContext/AuthContext.ts";

const Navbar = () => {
	const {user, logout} = useContext(AuthContext);

	const renderContent = useCallback(() => {
		const pathname = location.pathname;
		switch (pathname) {
			case '/login':
				return <>
					<p className={styles.navbar__text}>Nie masz konta?</p>
					<Link className={styles.navbar__link} to={'/registration'}>Załóż konto</Link>
				</>;
			case '/registration':
				return <>
					<p className={styles.navbar__text}>Masz konto?</p>
					<Link className={styles.navbar__link} to={'/login'}>Zaloguj się</Link>
				</>;
			default:
				return <>
					<p className={styles.navbar__text}>{`Cześć, ${user?.firstName} ${user?.lastName}`}</p>
					<button className={styles.navbar__link} onClick={() => logout()}>Wyloguj</button>
				</>;
		}
	}, [logout, user?.firstName, user?.lastName])

	return (
		<nav className={styles.navbar}>
			<div className={styles.navbar__bg}></div>
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