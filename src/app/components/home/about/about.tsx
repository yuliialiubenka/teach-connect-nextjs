import Link from 'next/link';
import Image from 'next/image';
import HomeImg from '../../../../../public/images/home-img.svg';
import styles from './about.module.scss';
import AnimatedText from './animated-text';


const About: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Unlock your potential with the best tutors for <span><AnimatedText /></span></h1>
                <p className={styles.description}>Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.</p>
                <Link className={styles.link} href="/teachers">Get started</Link>
            </div>
            <div className={styles.imgWrapper}>
                <Image
                    className={styles.img}
                    src={HomeImg}
                    alt="Girl with Laptop"
                    width={568}
                    height={530}
                    priority={true}
                />
            </div>
        </div>

    );
};

export default About;
