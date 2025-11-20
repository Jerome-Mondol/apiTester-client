import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import LandingPage from "../pages/LandingPage";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: LandingPage
            }
        ]
    }
])