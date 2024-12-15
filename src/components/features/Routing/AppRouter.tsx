import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthPage from "@pages/AuthPage/AuthPage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import OnboardingPage from "@pages/OnboardingPage/OnboardingPage.tsx";
import PublicRoute from "./PublicRoute.tsx";
import Dashboard from "@pages/Dashboard/Dashboard.tsx";


const AppRouter = () => {
	return (
		<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<Routes>
				<Route element={<PublicRoute/>}>
					<Route path={'/login'} element={<AuthPage isLogin={true}/>} />
					<Route path={'/registration'} element={<AuthPage isLogin={false}/>} />
				</Route>


					<Route path={'/onboarding'} element={<OnboardingPage/>}/>
					<Route path={'/'} element={<Dashboard/>}/>

			</Routes>
		</BrowserRouter>
	)
}

export default AppRouter;