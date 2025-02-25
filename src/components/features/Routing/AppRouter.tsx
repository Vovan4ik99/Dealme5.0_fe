import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "@pages/AuthPage/AuthPage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import OnboardingPage from "@pages/OnboardingPage/OnboardingPage.tsx";
import Dashboard from "@pages/Dashboard/Dashboard.tsx";
import FreelancerProfilePage from "@pages/FreelancerProfilePage/FreelancerProfilePage.tsx"

const AppRouter = () => {
	return (
		<BrowserRouter future={ { v7_startTransition: true, v7_relativeSplatPath: true } }>
			<Routes>
				<Route path={ '/login' } element={ <AuthPage isLogin={ true }/> }/>
				<Route path={ '/registration' } element={ <AuthPage isLogin={ false }/> }/>
				<Route element={ <ProtectedRoute/> }>
					<Route path={ '/freelancer/:id' } element={ <FreelancerProfilePage/> }/>
					<Route path={ '/onboarding' } element={ <OnboardingPage/> }/>
					<Route path={ '/profile' } element={ <FreelancerProfilePage/> }/>
					<Route path={ '/' } element={ <Dashboard/> }/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default AppRouter;