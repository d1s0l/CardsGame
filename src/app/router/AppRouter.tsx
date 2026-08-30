import { Routes, Route } from 'react-router-dom';

import HomePage from '../../pages/home/ui/HomePage';
import LoginPage from '../../pages/login/ui/LoginPage';
import RegisterPage from '../../pages/register/ui/RegisterPage';
import ProfilePage from '../../pages/profile/ui/ProfilePage';

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
            <Route
                path='/profile'
                element={<ProfilePage />}
            />
        </Routes>
    );
}