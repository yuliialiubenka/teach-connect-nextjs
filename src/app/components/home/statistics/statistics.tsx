import { StatisticsProps } from '@/typings';
import styles from './statistics.module.scss';

const StatisticsList: React.FC<StatisticsProps> = ({ options }) => {
    return (
        <ul className={styles.list}>
            {options.map((option, index) => (
                <li key={index} className={styles.item}>
                    <p className={styles.number}>{option.number}</p>
                    <p className={styles.title}>{option.title}</p>
                </li>
            ))}
        </ul>
    );
};

export default StatisticsList;
