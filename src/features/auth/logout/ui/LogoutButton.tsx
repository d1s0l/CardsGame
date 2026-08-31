import styles from '../../../../pages/profile/ui/ProfilePage.module.scss';
import { useLogout } from '../model/useLogout';

export default function LogoutButton() {
    const { handleLogout, isLogoutLoading, logoutError } = useLogout();

    return (
        <>
            <button
                type="button"
                className={styles.actionButton}
                onClick={handleLogout}
                disabled={isLogoutLoading}
            >
                {isLogoutLoading ? 'Выхожу...' : 'Выйти'}
            </button>

            {logoutError && <p>Не удалось выйти из аккаунта</p>}
        </>
    );
}
