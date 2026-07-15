import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import MyUrlsPage from "../pages/MyUrlsPage";
import Layout from "../components/Layout";
import AnalyticsPage from "../pages/AnalyticsPage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/urls"
                    element={<MyUrlsPage />}
                />

                <Route
                    path="/analytics"
                    element={<AnalyticsPage />}
                />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;