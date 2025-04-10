import styles from './App.module.scss'
import AppRouter from "@components/features/routing/AppRouter.tsx";
import {AuthProvider} from "@context/AuthContext/AuthProvider.tsx";
import bg_icon from '@icons/app/bg_icon.svg';
import {ModalProvider} from "@context/ModalContext/ModalProvider.tsx";

function App() {

	return (
		<AuthProvider>
			<ModalProvider>
				<div className={styles.app}>
					<div className={styles.app__bg}></div>
					<div className={styles.app__icon}>
						<img src={bg_icon} alt="background"/>
					</div>
					<AppRouter/>
				</div>
			</ModalProvider>
		</AuthProvider>
	)
}

export default App;
