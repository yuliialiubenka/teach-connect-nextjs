'use client';

import Link from "next/link";
import Image from 'next/image';
import img from '../../../public/images/page-not-found.svg'
import styles from "../styles/page.module.scss";

export default function page() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <section className={`${styles.section} ${styles.notFoundPage}`}>
                    <Image
                        className={styles.notFoundPageImg}
                        src={img}
                        alt="Error 404"
                        width={400}
                        height={240}
                        priority={true}
                    />
                    <p className={styles.info}>Oooops! Page not found... You should probably go back to the <Link className={styles.link} href="/">homepage</Link>.</p>
                </section>
            </div>
        </main>
    );
};
