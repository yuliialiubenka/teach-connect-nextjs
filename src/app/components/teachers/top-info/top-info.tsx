import { GoBook } from 'react-icons/go';
import { FaStar } from 'react-icons/fa';
import styles from './top-info.module.scss';
import { TopInfoProps } from '@/typings';

const TopInfo: React.FC<TopInfoProps> = ({
    lessons_done,
    rating,
    price_per_hour,
}) => {
    return (
        <ul className={styles.list}>
            <li className={styles.item}>
                <p className={styles.details}>
                    <span className={styles.icon}>
                        <GoBook />
                    </span>
                    Lessons online
                </p>
            </li>
            <li className={styles.item}>
                <p className={styles.details}>Lessons done: {lessons_done}</p>
            </li>
            <li className={styles.item}>
                <p className={styles.details}>
                    <span className={styles.rating}>
                        <FaStar />
                    </span>
                    Rating: {rating}
                </p>
            </li>
            <li className={styles.item}>
                <p className={styles.details}>
                    Price / 1 hour: <span className={styles.price}>{price_per_hour}$</span>
                </p>
            </li>
        </ul>
    );
};

export default TopInfo;
