import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import User from '../../../../../public/icons/user.svg'
import styles from './more-info.module.scss';
import { MoreInfoProps } from '@/typings';

const MoreInfo: React.FC<MoreInfoProps> = ({ experience, reviews }) => {
    return (
        <details className={styles.details}>
            <summary className={styles.summary}></summary>
            <div className={styles.reviewer}>
                <p className={styles.reviewerExperience}>{experience}</p>
                <ul className={styles.reviewerList}>
                    {reviews.map(({ reviewer_name, reviewer_rating, comment }, index) => (
                        <li key={index} className={styles.reviewerItem}>
                            <div className={styles.reviewerWrapper}>
                                <Image
                                    className={styles.reviewerImg}
                                    src={User}
                                    alt="User"
                                    width={44}
                                    height={44}
                                    priority={true}
                                />
                                <div>
                                    <p className={styles.reviewerName}>{reviewer_name}</p>
                                    <p className={styles.reviewerRating}>
                                        <span>
                                            <FaStar />
                                        </span>
                                        {reviewer_rating}
                                    </p>
                                </div>
                            </div>
                            <p className={styles.reviewerComment}>{comment}</p>
                        </li>))}
                </ul>
            </div>
        </details>
    );
};

export default MoreInfo;


