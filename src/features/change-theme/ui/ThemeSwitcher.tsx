import { useEffect, useState } from 'react'
import styles from './ThemeSwitcher.module.scss'

export default function ThemeSwitcher(){
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        document.body.dataset.theme = isDarkTheme ? 'dark' : 'light';
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    }, [isDarkTheme]);

    return(
        <div className={styles.block}>
            <img src="/light.svg" alt="light theme" />
            <button
                className={`${styles.switch} ${isDarkTheme ? styles['switch--active'] : ''}`}
                onClick={() => setIsDarkTheme((theme) => !theme)}
                type='button'
                aria-label="Toggle theme"
                aria-pressed={isDarkTheme}
            >
                <span className={styles.switch__thumb} />
            </button>
            <img src="/dark.svg" alt="dark theme" />
        </div>
    )
}
