import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage.tsx";

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={'/'} element={<></>}/>
				<Route path={'/login'} element={<LoginPage/>} />
			</Routes>
		</BrowserRouter>
	)
}

export default AppRouter;