import styles from "./AdminPanelNavbar.module.scss";
import Logo from "@ui/common/Logo/Logo.tsx";
import { NavLink } from "react-router-dom";
import { ReactComponent as DesktopIcon } from "@icons/named_exported/profile-navbar/desktop.svg";
import { ReactComponent as OrdersIcon } from "@icons/named_exported/profile-navbar/orders.svg";
import { ReactComponent as InvestorsIcon } from "@icons/named_exported/investor_registration.svg";
import { ReactComponent as FreelancersIcon } from "@icons/named_exported/freelancer_registration.svg";
import React, { useContext } from "react";
import { IAdminPanelNavbarProps } from "@components/layout/navbar/AdminPanelNavbar/adminPanelNavbarTypes.ts";
import UserMenuBtn from "@ui/button/UserMenuBtn/UserMenuBtn.tsx";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";

const AdminPanelNavbar: React.FC<IAdminPanelNavbarProps> = ({ ordersCount, freelancersCount, investorsCount, hasMarginBottom }) => {

    const { user } = useContext(AuthContext);

    return (
        <nav className={ styles['nav'] }
             style={ hasMarginBottom ? { marginBottom: '24px' } : {} }>
            <div className={ styles['nav__wrapper'] }>
                <Logo/>
                <div className={ styles['nav__links'] }>
                    <NavLink to={ '/admin' } className={ styles['nav__link'] }>
                        <DesktopIcon width={ 15 } height={ 15 }/>
                        <span>Pulpit</span>
                    </NavLink>
                    <NavLink to={ '/admin/orders' }
                             className={ ({ isActive }) =>
                                 `${ styles['nav__link'] } ${ isActive && styles['nav__link--active'] }` }>
                        <OrdersIcon width={ 15 } height={ 15 }/>
                        <span>Zlecenia</span>
                        <div className={ styles['nav__link-counter'] }>
                            { ordersCount }
                        </div>
                    </NavLink>
                    <NavLink to={ '/admin/investors' }
                             className={ ({ isActive }) =>
                                 `${ styles['nav__link'] } ${ isActive && styles['nav__link--active'] }` }>
                        <InvestorsIcon width={ 14 } height={ 17 }/>
                        <span>Inwestorzy</span>
                        <div className={ styles['nav__link-counter'] }>
                            { investorsCount }
                        </div>
                    </NavLink>
                    <NavLink to={ '/admin/freelancers' }
                             className={ ({ isActive }) =>
                                 `${ styles['nav__link'] } ${ isActive && styles['nav__link--active'] }` }>
                        <FreelancersIcon width={ 14 } height={ 15 }/>
                        <span>Freelancerzy</span>
                        <div className={ styles['nav__link-counter'] }>
                            { freelancersCount }
                        </div>
                    </NavLink>
                </div>
            </div>
            <UserMenuBtn userFirstName={ user?.email }
                         isAdmin/>
        </nav>
    );
};

export default AdminPanelNavbar;