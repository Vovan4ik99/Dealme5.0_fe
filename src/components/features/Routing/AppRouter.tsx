import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.tsx";
import OnboardingPage from "@pages/OnboardingPage/OnboardingPage.tsx";
import Dashboard from "@pages/Dashboard/Dashboard.tsx";
import FreelancerProfilePage from "@pages/FreelancerProfilePage/FreelancerProfilePage.tsx"
import ResetPasswordPage from "@pages/Auth/ResetPasswordPage/ResetPasswordPage.tsx";
import AuthPage from "@pages/Auth/AuthPage/AuthPage.tsx";
import OnboardingLayout from "@components/layout/OnboardingLayout/OnboardingLayout.tsx";
import InvestorStartServicePage from "@pages/InvestorStartServicePage/InvestorStartServicePage.tsx";

const AppRouter = () => {
	return (
		<BrowserRouter future={ { v7_startTransition: true, v7_relativeSplatPath: true } }>
			<Routes>
				<Route path={ '/login' } element={ <AuthPage isLogin={ true }/> }/>
				<Route path={ '/registration' } element={ <AuthPage isLogin={ false }/> }/>
				<Route path={ '/reset-password' } element={ <ResetPasswordPage/> }/>
				<Route path={ '/investor' } element={ <OnboardingLayout userType={'INVESTOR'}/> }/>
				<Route path={ '/investor-start'} element={ <InvestorStartServicePage />} />
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