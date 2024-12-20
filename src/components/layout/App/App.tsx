import styles from './App.module.scss'
import bg_icon from '@icons/bg_icon.svg'
import AppRouter from "../../features/Routing/AppRouter.tsx";
import {AuthProvider} from "@context/AuthContext/AuthProvider.tsx";

function App() {

	return (
		<AuthProvider>
			<div className={styles.app}>
				<div className={styles.app__bg}></div>
				<div className={styles.app__icon}>
					<img src={bg_icon} alt={'bg icon'}/>
				</div>
				<AppRouter/>
			</div>
		</AuthProvider>
	)
}

export default App;
