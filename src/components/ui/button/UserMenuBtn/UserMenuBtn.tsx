import styles from "./UserMenuBtn.module.scss";
import DropDownModal from "@ui/select/DropdownModal/DropdownModal.tsx";
import React, { useContext, useRef, useState } from "react";
import SelectOption from "@ui/select/SelectOption/SelectOption.tsx";
import { ILoggedUserOption } from "@components/layout/navbar/ProfileNavbar/ProfileNavbarTypes.ts";
import { ReactComponent as LogoutIcon } from "@icons/named_exported/profile-navbar/logout.svg";
import { ReactComponent as LockIcon } from "@icons/named_exported/profile-navbar/lock.svg";
import { ReactComponent as GearIcon } from "@icons/named_exported/profile-navbar/gear.svg";
import { ReactComponent as EditIcon } from "@icons/named_exported/edit_icon.svg";
import { ReactComponent as GuardianIcon } from "@icons/named_exported/profile-navbar/guardian.svg";
import { ReactComponent as ArrowDown } from "@icons/named_exported/arrow_down.svg";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import {IUserMenuBtnProps} from "@ui/button/UserMenuBtn/UserMenuBtnTypes.ts";

const UserMenuBtn: React.FC<IUserMenuBtnProps> = ({
                                                      userAvatar,
                                                      userFirstName,
                                                      userLastName,
                                                      isAdmin
                                                  }) => {

    const avatarMenuOptions: ILoggedUserOption[] = [
        { value: "Edycja danych", icon: <EditIcon/> },
        { value: "Zmień hasło", icon: <LockIcon/> },
        { value: "Ustawienia", icon: <GearIcon/> },
        { value: "Wyloguj się", icon: <LogoutIcon/>, onClick: () => logout() },
    ];

    const { logout } = useContext(AuthContext);

    const btnRef = useRef<HTMLButtonElement | null>(null);

    const [ isDropdownOpened, setIsDropdownOpened ] = useState<boolean>(false);

    const renderMenuOptions = () => {
        return avatarMenuOptions.map((item, index) => {
            return (
                <SelectOption key={ index + 1 }
                              value={ item.value }
                              icon={ item.icon }
                              info={ null }
                              onClick={ item.onClick }/>
            );
        });
    };

    return (
        <div className={ styles["menu"] }>
            <button
                className={ `
					${ styles["menu__btn"] } 
					${ isDropdownOpened && styles["menu__btn--active"] }`
                }
                onClick={ () => setIsDropdownOpened(!isDropdownOpened) }
                ref={ btnRef }>
                <div className={ `${ styles["menu__avatar"] }` }>
                    { userAvatar ? <img src={ userAvatar } alt="avatar"/> : <GuardianIcon width={ 22 } height={ 22 }/> }
                </div>
                <div className={ styles["menu__info"] }>
                    <span className={ styles['menu__name'] }>{ userFirstName } { userLastName }</span>
                    { isAdmin && <span className={ styles['menu__role'] }>Admin</span> }
                </div>
                <ArrowDown className={ ` ${ styles["menu__arrow"] } ${ isDropdownOpened && styles["menu__arrow--active"] }` }/>
            </button>
            <DropDownModal isOpen={ isDropdownOpened }
                           renderItems={ renderMenuOptions() }
                           width={ btnRef.current?.clientWidth ?? "100%" }/>
        </div>
    );
};

export default UserMenuBtn;