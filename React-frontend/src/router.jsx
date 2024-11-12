
import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Loginpage from "./pages/Loginpage";
import Registration from "./pages/Registration";
import AboutPage from "./pages/AboutPage";
import ModelPage from "./pages/ModelPage";
import Layout from "./pages/Layout";

export const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Layout/>, 
        children: [
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/login", element: <Loginpage /> },
            { index: true, element: <Homepage /> },
            { path: "/registration", element: <Registration /> },
            { path: "/homepage", element: <Homepage /> },
            { path: "/modelpage", element: <ModelPage/> },
            { path: "/aboutpage", element: <AboutPage/> },
        ] 
    }
]);
    