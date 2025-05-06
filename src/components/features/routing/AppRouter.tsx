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
import ServicePage from "@pages/ServicePage/ServicePage.tsx";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage.tsx";

const AppRouter = () => {

	return (
		<BrowserRouter future={ { v7_startTransition: true, v7_relativeSplatPath: true } }>
			<Routes>
				<Route path={ '/login' } element={ <AuthPage isLogin={ true }/> }/>
				<Route path={ '/registration' } element={ <AuthPage isLogin={ false }/> }/>
				<Route path={ '/reset-password' } element={ <ResetPasswordPage/> }/>
				<Route path={ '/investor/start' } element={ <InvestorStartPage/> }/>
				<Route path={ '/404' } element={ <NotFoundPage/> } />
				<Route path={ '*' } element={ <NotFoundPage/> } />
				<Route element={ <ProtectedRoute/> }>
					{ /*Investor Paths*/ }
					<Route path={ '/investor/service'} element={ <ServicePage/> }/>
					<Route path={ '/investor/onboarding' } element={ <OnboardingPage userRole={ 'INVESTOR' }/> }/>
					<Route path={ '/investor/onboarding/summary' } element={ <OnboardingSummary/> }/>

					{ /*Freelancer Paths*/ }
					<Route path={ '/freelancer/onboarding/start' } element={ <FreelancerOnboardingStartPage/> }/>
					<Route path={ '/freelancer/onboarding' } element={ <OnboardingPage userRole={ 'FREELANCER' }/> }/>
					<Route path={ '/freelancer/profile' } element={ <FreelancerProfilePage/> }/>

					{ /*Admin Paths*/ }
					<Route path={ '/freelancer/profile/:id' } element={ <FreelancerProfilePage/> }/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;