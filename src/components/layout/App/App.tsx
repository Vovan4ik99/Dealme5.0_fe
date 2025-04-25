import styles from './App.module.scss'
import AppRouter from "@components/features/routing/AppRouter.tsx";
import {AuthProvider} from "@context/AuthContext/AuthProvider.tsx";
import bg_icon from '@icons/app/bg_icon.svg';
import {ModalProvider} from "@context/ModalContext/ModalProvider.tsx";
import {useState} from "react";

function App() {
	const [ isExisting, setIsExisitng] = useState<boolean>(true);

	const isExistningRoute = (isValid: boolean) => {
		setIsExisitng(isValid);
	}

	return (
		<AuthProvider>
			<ModalProvider>
				<div className={ styles["app"] }>
					<div className={ styles["app__bg"] }></div>
					<div className={ `${ styles["app__icon"] } ${ !isExisting && styles["app__icon--centered"]}` }>
						<img src={ bg_icon } alt="background"/>
					</div>
					<AppRouter setPageIsPageValid={ isExistningRoute }/>
				</div>
			</ModalProvider>
		</AuthProvider>
	)
}

export default App;
