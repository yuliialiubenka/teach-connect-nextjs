import styles from './card.module.scss';
import Image from 'next/image';
import TopInfo from '../top-info/top-info';
import MoreInfo from '../more-info/more-info';
import LevelsList from '../levels-list/levels-list';
import BookBtn from '../book-btn/book-btn';
import LikeBtn from '../like-btn/like-btn';
import { TeacherCardProps } from '@/typings';

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, page }) => {
    const { id, name, surname, languages, lesson_info, conditions, avatar_url, lessons_done, rating, price_per_hour, experience, reviews, levels } = teacher;

    return (
        <li className={styles.item}>
            <div className={styles.avatarWrap}>
                <Image
                    className={styles.avatar}
                    width={96}
                    height={96}
                    src={avatar_url}
                    alt={`${name} ${surname}`}
                    priority={true}
                />
            </div>
            <div className={styles.wrap}>
                <div className={styles.topWrap}>
                    <TopInfo
                        lessons_done={lessons_done}
                        rating={rating}
                        price_per_hour={price_per_hour}
                    />
                    <p className={styles.coloredText}>Language</p>
                    <p className={styles.name}>{`${name} ${surname}`}</p>
                    <ul className={styles.details}>
                        <li className={styles.detailsItem}>
                            <span className={styles.coloredText}>Speaks:</span> {languages.join(', ')}
                        </li>
                        <li className={styles.detailsItem}>
                            <span className={styles.coloredText}>Lesson Info:</span> {lesson_info}</li>
                        <li className={styles.detailsItem}>
                            <span className={styles.coloredText}>Conditions:</span> {conditions.join(' ')}
                        </li>
                    </ul>
                    <LikeBtn id={id} teacher={teacher}></LikeBtn>
                </div>
                <MoreInfo experience={experience} reviews={reviews} />
                <LevelsList levels={levels} />
                <BookBtn teacherId={id} page={page as string} />
            </div>
        </li>
    );
};

export default TeacherCard;
