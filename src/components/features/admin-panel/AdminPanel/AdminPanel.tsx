import Footer from "@components/layout/Footer/Footer.tsx";
import styles from './AdminPanel.module.scss';
import React, { useContext } from "react";
import { IAdminPanelProps } from "@components/features/admin-panel/AdminPanel/adminPanelTypes.ts";
import AdminPanelNavbar from "@components/layout/navbar/AdminPanelNavbar/AdminPanelNavbar.tsx";
import { useLoadingStatus } from "@hooks/loadingStatus.hook.ts";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";

const AdminPanel: React.FC<IAdminPanelProps> = ({ activeLink }) => {

	const isLoading = useLoadingStatus(useContext(AuthContext));

	if (isLoading) {
		return <LoadingSpinner/>;
	}

	return (
		<section className={ styles['panel'] }>
			<AdminPanelNavbar ordersCount={ 0 }
			                  freelancersCount={ 0 }
			                  investorsCount={ 0 }/>
			{/*content*/ }
			<Footer isCentered={ false } isHyphenated={ false }/>
		</section>
	);
};

export default AdminPanel;