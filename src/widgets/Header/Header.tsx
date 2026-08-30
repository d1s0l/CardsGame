import { Link } from "react-router-dom"
import ThemeSwitcher from "../../features/change-theme/ui/ThemeSwitcher"
import styles from './Header.module.scss'
import { useState } from "react"

export default function Header() {
    const [active, setActive] = useState('home')

    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src="Logo.svg" alt="logo" />
            </div>
            <nav className={styles.router}>
                <Link 
                    className={`${styles.navBtn} ${active === 'home' ? styles.navBtnActive : ''}`} 
                    onClick={()=>setActive('home')}
                    to="/">
                        Главная
                </Link>
                <Link 
                    className={`${styles.navBtn} ${active === 'libary' ? styles.navBtnActive : ''}`} 
                    onClick={()=>setActive('libary')}
                    to='/libary'>
                        Библиотека
                </Link>
                <Link 
                    className={`${styles.navBtn} ${active === 'create' ? styles.navBtnActive : ''}`} 
                    onClick={()=>setActive('create')}
                    to='/create'>
                        Создать модуль
                </Link>
            </nav>
            <div className={styles.rightblock}>
                <ThemeSwitcher />
                
                <Link to="/profile">
                    <img src="/profile.svg" alt="profile" />
                </Link>
            </div>
        </header>
    )
}
