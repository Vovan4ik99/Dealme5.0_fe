import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.tsx";
import FreelancerOnboardingPage from "@pages/FreelancerOnboardingPage/FreelancerOnboardingPage.tsx";
import Dashboard from "@pages/Dashboard/Dashboard.tsx";
import FreelancerProfilePage from "@pages/FreelancerProfilePage/FreelancerProfilePage.tsx"
import ResetPasswordPage from "@pages/auth/ResetPasswordPage/ResetPasswordPage.tsx";
import AuthPage from "@pages/auth/AuthPage/AuthPage.tsx";
import InvestorStartPage from "@pages/InvestorStartPage/InvestorStartPage.tsx";
import OnboardingPage from "@pages/onboarding/OnboardingPage/OnboardingPage.tsx";
import OnboardingSummary from "@pages/onboarding/OnboardingSummary/OnboardingSummary.tsx";
import FreelancerOnboardingStartPage
	from "@pages/onboarding/FreelancerOnboardingStartPage/FreelancerOnboardingStartPage.tsx";

const AppRouter = () => {
	return (
		<BrowserRouter future={ { v7_startTransition: true, v7_relativeSplatPath: true } }>
			<Routes>
				<Route path={ '/login' } element={ <AuthPage isLogin={ true }/> }/>
				<Route path={ '/registration' } element={ <AuthPage isLogin={ false }/> }/>
				<Route path={ '/reset-password' } element={ <ResetPasswordPage/> }/>
				<Route path={ '/investor/start' } element={ <InvestorStartPage/> }/>
				<Route element={ <ProtectedRoute/> }>
					<Route path={ '/investor/onboarding' } element={ <OnboardingPage userRole={ 'INVESTOR' }/> }/>
					<Route path={ '/freelancer/onboarding' } element={ <OnboardingPage userRole={ 'FREELANCER' }/> }/>
					<Route path={ '/investor/onboarding/summary' } element={ <OnboardingSummary/> }/>
					<Route path={ '/freelancer/onboarding/start' } element={ <FreelancerOnboardingStartPage/> }/>
					<Route path={ '/freelancer/profile/:id' } element={ <FreelancerProfilePage/> }/>
					<Route path={ '/onboarding' } element={ <FreelancerOnboardingPage/> }/>
					<Route path={ '/freelancer/profile' } element={ <FreelancerProfilePage/> }/>
					<Route path={ '/' } element={ <Dashboard/> }/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;