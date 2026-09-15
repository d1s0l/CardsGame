import { Routes, Route, Outlet, useLocation } from 'react-router-dom';

import Header from '../../widgets/Header/Header';
import HomePage from '../../pages/home/ui/HomePage';
import LoginPage from '../../pages/login/ui/LoginPage';
import RegisterPage from '../../pages/register/ui/RegisterPage';
import ProfilePage from '../../pages/profile/ui/ProfilePage';
import CreateCardPage from '../../pages/create-card/ui/CreateCardPage';
import FindPage from '../../pages/find/ui/Find';
import AuthGuard from './guards/AuthGuard';

function AppLayout() {
    const location = useLocation();
    const hideHeader = location.pathname === '/login' || location.pathname === '/register';

    return (
        <>
            {!hideHeader && <Header />}
            <Outlet />
        </>
    );
}

export function AppRouter() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                <Route element={<AuthGuard />}>
                    <Route
                        path='/profile'
                        element={<ProfilePage />}
                    />
                    <Route
                        path='/create'
                        element={<CreateCardPage />}
                    />
                    <Route
                        path='/find'
                        element={<FindPage />}
                    />
                </Route>
            </Route>
        </Routes>
    );
}