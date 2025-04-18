import { NavLink } from "react-router-dom";
import styles from "./ProfileNavbar.module.scss";
import Logo from "@ui/common/Logo/Logo.tsx";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";
import { ReactComponent as PulpitIcon } from "@icons/named_exported/profile-navbar/desktop.svg";
import { ReactComponent as OrdersIcon } from "@icons/named_exported/profile-navbar/orders.svg";
import { ReactComponent as ProductsIcon } from "@icons/named_exported/profile-navbar/products.svg";
import { ReactComponent as GuardianIcon } from "@icons/named_exported/profile-navbar/guardian.svg";
import { ReactComponent as PaymentsIcon } from "@icons/named_exported/profile-navbar/payments.svg";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";
import { ReactComponent as ArrowDown } from "@icons/named_exported/arrow-down.svg";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { ReactComponent as LogoutIcon } from "@icons/named_exported/profile-navbar/logout.svg";
import { ReactComponent as LockIcon } from "@icons/named_exported/profile-navbar/lock.svg";
import { ReactComponent as GearIcon } from "@icons/named_exported/profile-navbar/gear.svg";
import { ReactComponent as EditIcon } from "@icons/named_exported/edit_icon.svg";
import { EMITTER_EVENTS, useEventEmitter } from "@hooks/emitter.hook.ts";
import { useFreelancerAvatarService } from "@services/freelancer/freelancerAvatarService.ts";
import DropDownModal from "@ui/select/DropdownModal/DropdownModal.tsx";
import SelectOption from "@ui/select/SelectOption/SelectOption.tsx";
import { ILoggedUserOption } from "@components/layout/navbar/ProfileNavbar/ProfileNavbarTypes.ts";

const ProfileNavbar = () => {
	const EVENT: EMITTER_EVENTS = "updateAvatar";

	 const avatarMenuOptions: ILoggedUserOption[]= [
		{ value: "Edycja danych", icon: <EditIcon/> },
		{ value: "Zmień hasło", icon: <LockIcon/> },
		{ value: "Ustawienia", icon: <GearIcon/> },
		{ value: "Wyloguj się", icon: <LogoutIcon/>, onClick: () =>  logout() },
	]

	const { user, loadingStatus, logout } = useContext(AuthContext);

	const { getAvatar } = useFreelancerAvatarService();

	const avatarButtonRef = useRef<HTMLButtonElement | null>(null);

	const [ avatar, setAvatar ] = useState<string | undefined>();
	const [ isDropdownOpened, setIsDropdownOpened ] = useState<boolean>(false);

	const fetchAvatar = useCallback(() => {
		if (!user) return;
		getAvatar(user.id)
			.then((res) => setAvatar(res ? res.pictureData : undefined))
			.catch(console.error);
	}, [ getAvatar, user ]);

	const renderAvatarOptions = () => {
		return avatarMenuOptions.map((item, index) => {
			return (
				<SelectOption key={ index + 1 }
							  value={ item.value }
							  icon={ item.icon }
							  info={ null }
							  onClick={ item.onClick }/>
			);
		});
	}

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
				<button className={ `btn btn--more 
									${ styles["navbar__btn"] } 
									${ styles["navbar__btn--order"] }` }>
					<AddIcon/>
					Przyjmij zlecenie
				</button>
				<div className={ styles["navbar__menu"] }>
					<button
						className={ `btn btn--more 
									 ${ styles["navbar__btn"] }
									 ${ styles["navbar__btn--avatar"] }
					 				 ${ avatar ? styles["navbar__btn--pl43"] : styles["navbar__btn--pl35"] } 
					 				 ${ isDropdownOpened && styles["navbar__btn--active"] }`}
						onClick={ () => setIsDropdownOpened(!isDropdownOpened) }
						ref={ avatarButtonRef }>
						<div className={ `${ styles["navbar__avatar"] }`}>
							{ avatar ? <img src={ avatar } alt="avatar"/> : <GuardianIcon/> }
						</div>
						{ user?.firstName } { user?.lastName }
						 <ArrowDown className={ `${ isDropdownOpened && styles["navbar__btn--arrow"] }` }/>
					</button>
					<DropDownModal isOpen={ isDropdownOpened }
								   renderItems={ renderAvatarOptions() }
					 			   width={ avatarButtonRef.current?.clientWidth ?? "100%" }/>
				</div>
			</div>
		</nav>

	);
};
export default ProfileNavbar;
