import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import LandingPage from "../pages/LandingPage";
import LoginForm from "../components/Forms/LoginForm";
import SignUpForm from "../components/Forms/SignUpForm";
import Dashboard from "../components/Dashboard";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: LandingPage
            },
            {
                path: '/login',
                Component: LoginForm
            },
            {
                path: '/sign-up',
                Component: SignUpForm
            },
            
        ]
    },
    {
        path: '/dashboard',
        Component: Dashboard
    }
])