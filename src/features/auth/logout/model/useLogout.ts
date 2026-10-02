import { useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '../../../../app/api/users/usersApi';
import { removeToken } from '../../../../shared/lib/auth/token';

export function useLogout() {
    const navigate = useNavigate();

    const [logout, { isLoading: isLogoutLoading, error: logoutError }] = useLogoutMutation();

    const handleLogout = async () => {
        const result = await logout();
        if ('error' in result) return;

        removeToken();
        navigate('/');
    };

    return {
        handleLogout,
        isLogoutLoading,
        logoutError,
    };
}
