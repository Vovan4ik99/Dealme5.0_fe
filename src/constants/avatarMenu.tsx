import { ReactComponent as EditIcon } from "@icons/named_exported/edit_icon.svg";
import { ReactComponent as LockIcon } from "@icons/named_exported/profile-navbar/lock.svg";
import { ReactComponent as GearIcon } from "@icons/named_exported/profile-navbar/gear.svg";
import { ReactComponent as LogoutIcon } from "@icons/named_exported/profile-navbar/logout.svg";

export const AvatarMenuOptions = [
    { label: "Edycja danych", icon: <EditIcon/> },
    { label: "Zmień hasło", icon: <LockIcon/> },
    { label: "Ustawienia", icon: <GearIcon/> },
    { label: "Wyloguj się", icon: <LogoutIcon/> },
]