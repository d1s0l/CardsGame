import { Routes, Route, Outlet, useLocation } from 'react-router-dom';

import EditCardPage from '../../pages/edit-card/ui/EditCardPage';
import Header from '../../widgets/Header/Header';
import HomePage from '../../pages/home/ui/HomePage';
import LoginPage from '../../pages/login/ui/LoginPage';
import RegisterPage from '../../pages/register/ui/RegisterPage';
import ProfilePage from '../../pages/profile/ui/ProfilePage';
import CreateCardPage from '../../pages/create-card/ui/CreateCardPage';
import LibaryPage from '../../pages/find/ui/Libary';
import CardPage from '../../pages/card/ui/CardPage';
import AuthGuard from './guards/AuthGuard';
import MyCardsPage from '../../pages/my-cards/ui/MyCardsPage';

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
                        path='/libary'
                        element={<LibaryPage />}
                    />
                    <Route
                        path='/libary/:cardId'
                        element={<CardPage />}
                    />
                    <Route
                        path='/my-cards'
                        element={<MyCardsPage />}
                    />
                    <Route
                        path="/cards/:cardId/edit"
                        element={<EditCardPage />}
                    />
                </Route>
            </Route>
        </Routes>
    );
}
