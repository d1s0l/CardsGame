import { Routes, Route } from 'react-router-dom';

import HomePage from '../../pages/home/ui/HomePage';
import LoginPage from '../../pages/login/ui/LoginPage';
import RegisterPage from '../../pages/register/ui/RegisterPage';
import ProfilePage from '../../pages/profile/ui/ProfilePage';
import AuthGuard from './guards/AuthGuard';
import CreateCardPage from '../../pages/create-card/ui/CreateCardPage';
import FindPage from '../../pages/find/ui/Find';

export function AppRouter() {
    return (
        <Routes>
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
                    path='/create-card'
                    element={<CreateCardPage />}
                />
                <Route
                    path='/find'
                    element={<FindPage />}
                />
            </Route>

        </Routes>
    );
}