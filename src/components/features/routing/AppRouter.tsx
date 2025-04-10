import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.tsx";
import FreelancerProfilePage from "@pages/FreelancerProfilePage/FreelancerProfilePage.tsx"
import ResetPasswordPage from "@pages/auth/ResetPasswordPage/ResetPasswordPage.tsx";
import AuthPage from "@pages/auth/AuthPage/AuthPage.tsx";
import InvestorStartPage from "@pages/InvestorStartPage/InvestorStartPage.tsx";
import OnboardingPage from "@pages/onboarding/OnboardingPage/OnboardingPage.tsx";
import OnboardingSummary from "@pages/onboarding/OnboardingSummary/OnboardingSummary.tsx";
import FreelancerOnboardingStartPage
	from "@pages/onboarding/FreelancerOnboardingStartPage/FreelancerOnboardingStartPage.tsx";
import AdminPanel from "@components/features/admin-panel/AdminPanel/AdminPanel.tsx";

const AppRouter = () => {
	return (
		<BrowserRouter future={ { v7_startTransition: true, v7_relativeSplatPath: true } }>
			<Routes>
				<Route path={ '/login' } element={ <AuthPage isLogin={ true }/> }/>
				<Route path={ '/registration' } element={ <AuthPage isLogin={ false }/> }/>
				<Route path={ '/reset-password' } element={ <ResetPasswordPage/> }/>
				<Route path={ '/investor/start' } element={ <InvestorStartPage/> }/>
				<Route element={ <ProtectedRoute/> }>
					{/*Investor Paths*/ }
					<Route path={ '/investor/onboarding' } element={ <OnboardingPage userRole={ 'INVESTOR' }/> }/>
					<Route path={ '/investor/onboarding/summary' } element={ <OnboardingSummary/> }/>

					{/*Freelancer Paths*/ }
					<Route path={ '/freelancer/onboarding/start' } element={ <FreelancerOnboardingStartPage/> }/>
					<Route path={ '/freelancer/onboarding' } element={ <OnboardingPage userRole={ 'FREELANCER' }/> }/>
					<Route path={ '/freelancer/profile/:id' } element={ <FreelancerProfilePage/> }/>
					<Route path={ '/freelancer/profile' } element={ <FreelancerProfilePage/> }/>

					{/*Admin Paths*/ }
					<Route path={ '/admin' } element={ <AdminPanel activeLink={ 'Dashboard' }/> }/>
					<Route path={ '/admin/orders' } element={ <AdminPanel activeLink={ 'Orders' }/> }/>
					<Route path={ '/admin/investors' } element={ <AdminPanel activeLink={ 'Investors' }/> }/>
					<Route path={ '/admin/freelancers' } element={ <AdminPanel activeLink={ 'Freelancers' }/> }/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;