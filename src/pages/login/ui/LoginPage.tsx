import styles from './LoginPage.module.scss';
import LoginForm from '../../../features/auth/login/ui/LoginForm';

export default function LoginPage() {
    return (
        <main className={styles.page}>
            <div className={styles.card}>
                <LoginForm />
            </div>
        </main>
    );
}