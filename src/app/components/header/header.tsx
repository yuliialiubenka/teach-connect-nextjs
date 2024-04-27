'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../../lib/firebase/firebase';
import { FiLogIn } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { deleteToken } from '../../redux/sliceAuth';
import styles from './header.module.scss';
import Ukraine from '../../../../public/icons/ukraine.svg';
import { User, RootState } from '@/typings';

const Header = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const authUser = useSelector((state: RootState) => state.authUser.token);

    const [activePath, setActivePath] = useState(pathname);

    useEffect(() => {
        setActivePath(pathname);
    }, [pathname]);

    const isActiveLink = (href: string) => {
        return activePath === href ? styles.active : '';
    };

    const clickLogOut = async () => {
        try {
            router.push('/');
            await signOut(auth);
            setUser(null);
            dispatch(deleteToken());
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        auth.onAuthStateChanged(params => {
            const user = auth.currentUser;

            if (authUser || user) {
                return setUser(params as User);
            }
            return;
        });
    }, [authUser]);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.wrapperLogo}>
                    <Image
                        className={styles.imgLogo}
                        src={Ukraine}
                        alt="Flag Ukraine"
                        width={28}
                        height={28}
                        priority={true}
                    />
                    <p className={styles.titleLogo}>LearnLingo</p>
                </div>
                <nav className={styles.listWrapper}>
                    <ul className={styles.list}>
                        <li>
                            <Link href="/" className={`${styles.navigate} ${isActiveLink('/')}`}>Home</Link>
                        </li>
                        <li>
                            <Link href="/teachers" className={`${styles.navigate} ${isActiveLink('/teachers')}`}>Teachers</Link>
                        </li>
                        {user && (
                            <li>
                                <Link href="/favorites" className={`${styles.navigate} ${isActiveLink('/favorites')}`}>Favorites</Link>
                            </li>
                        )}
                    </ul>
                </nav>
                {!user && (
                    <ul className={styles.wrapperAuth}>
                        <li>
                            <button
                                className={styles.buttonLogin}
                                onClick={() => router.push('/login', { scroll: false })}
                            >
                                <span>
                                    <FiLogIn />
                                </span>
                                Log in
                            </button>
                        </li>
                        <li>
                            <button
                                className={styles.buttonRegister}
                                onClick={() => router.push('/register', { scroll: false })}
                            >
                                Register
                            </button>
                        </li>
                    </ul>
                )}
                {user && (
                    <button
                        type="button"
                        className={styles.buttonLogout}
                        onClick={clickLogOut}
                    >
                        Log out
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
