import { useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '../../../../app/api/users/usersApi';
import { removeToken } from '../../../../shared/lib/auth/token';

export function useLogout() {
    const navigate = useNavigate();

    const [logout, { isLoading: isLogoutLoading, error: logoutError }] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            removeToken();
            navigate('/');
        } catch (error) {
            console.error('Ошибка выхода:', error);
        }
    };

    return {
        handleLogout,
        isLogoutLoading,
        logoutError,
    };
}
