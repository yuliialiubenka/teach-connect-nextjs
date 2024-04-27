import LoginForm from '../../components/auth/login-form';
import styles from "../../styles/page.module.scss";
import Image from 'next/image';
import img from '../../../../public/images/auth-form.svg';

export default function Page() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <section className={`${styles.section} ${styles.authPage}`}>
                    <LoginForm />
                    <Image
                        className={styles.authPageImg}
                        src={img}
                        alt="Log In"
                        width={750}
                        height={400}
                        priority={true}
                    />
                </section>
            </div>
        </main>
    )
}