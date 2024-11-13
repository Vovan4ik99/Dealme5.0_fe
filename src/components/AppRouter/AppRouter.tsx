import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage.tsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.tsx";

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={'/'} element={
					<ProtectedRoute>
						<></>
					</ProtectedRoute>
				}/>
				<Route path={'/login'} element={<LoginPage isLogin={true}/>} />
				<Route path={'/registration'} element={<LoginPage isLogin={false}/>} />
			</Routes>
		</BrowserRouter>
	)
}

export default AppRouter;