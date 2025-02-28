import { NavLink } from "react-router-dom";
import styles from "./ProfileNavbar.module.scss";
import Logo from "@ui/Logo/Logo.tsx";
import {useCallback, useContext, useEffect, useState} from "react";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import { ReactComponent as PulpitIcon } from "@icons/named_exported/profile-navbar/desktop.svg";
import { ReactComponent as OrdersIcon } from "@icons/named_exported/profile-navbar/orders.svg";
import { ReactComponent as ProductsIcon } from "@icons/named_exported/profile-navbar/products.svg";
import { ReactComponent as GuardianIcon } from "@icons/named_exported/profile-navbar/guardian.svg";
import { ReactComponent as PaymentsIcon } from "@icons/named_exported/profile-navbar/payments.svg";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";
import { ReactComponent as ArrowDown } from "@icons/named_exported/arrow-down.svg";
import avatar from "@icons/profile_navbar/default_avatar.svg";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { EMITTER_EVENTS, useEventEmitter } from "@hooks/emitter.hook..ts";
import { useFreelancerAvatarService } from "@services/freelancer/freelancerAvatarService.ts";

const ProfileNavbar = () => {
	const EVENT: EMITTER_EVENTS = "updateAvatar";

	const { user, loadingStatus } = useContext(AuthContext);

	const { getAvatar } = useFreelancerAvatarService();

	const [ userAvatar, setAvatar ] = useState<string | null>(null);

	const fetchAvatar = useCallback(() => {
		getAvatar()
			.then((res) => {
				setAvatar(res ? res.picture : null);
			})
			.catch(console.error);
	}, [ getAvatar ]);

	useEffect(fetchAvatar, [ fetchAvatar ]);

	useEventEmitter(EVENT, fetchAvatar);

	if (loadingStatus === "loading") {
		return <LoadingSpinner/>;
	}

	return (
		<nav className={ styles.navbar }>
			<Logo/>
			<div className={ styles.navbar__wrapper }>
				<NavLink to="/profile" className={ ({ isActive }) =>
					`${ styles.navbar__item } ${ isActive ? styles["navbar__item-active"] : "" }` }>
					<PulpitIcon/>
					Pulpit
				</NavLink>
				<NavLink to="/" className={ ({ isActive }) =>
					`${ styles.navbar__item } ${ isActive ? styles["navbar__item-active"] : "" }` }>
					<OrdersIcon/>
					Zlecenia
				</NavLink>
				<NavLink to="/" className={ ({ isActive }) =>
					`${ styles.navbar__item } ${ isActive ? styles["navbar__item-active"] : "" }` }>
					<ProductsIcon/>
					Produkty
				</NavLink>
				<NavLink to="/" className={ ({ isActive }) =>
					`${ styles.navbar__item } ${ isActive ? styles["navbar__item-active"] : "" }` }>
					<GuardianIcon/>
					Opiekun
				</NavLink>
				<NavLink to="/" className={ ({ isActive }) =>
					`${ styles.navbar__item } ${ isActive ? styles["navbar__item-active"] : "" }` }>
					<PaymentsIcon height={ 14 }/>
					Płatności
				</NavLink>
			</div>
			<div className={ styles["navbar__add-wrapper"] }>
				<button className={ `btn btn--more ${ styles["navbar__btn"] }` }>
					<AddIcon/>
					Przyjmij zlecenie
				</button>
				<button className={ `btn btn--more ${ styles["navbar__btn"] } ${ styles["navbar__btn--avatar"] }
				 ${ userAvatar !== null && styles["navbar__btn--pl53"] }` }>
					<div className={ `${ styles["navbar__avatar"] }` }>
						<img src={ userAvatar ?? avatar } alt="avatar"/>
					</div>
					{ user?.firstName } { user?.lastName }
					<ArrowDown/>
				</button>
			</div>
		</nav>
	);
};
export default ProfileNavbar;
