'use client';

import React from 'react';
import BookForm from './book-form';
import Image from 'next/image';
import styles from './book-modal.module.scss';
import { useTeacherById } from '../../../../lib/firebase/getTeacherById';
import { BookModalProps } from '@/typings';

const BookModal: React.FC<BookModalProps> = ({ teacherId }) => {
    const teacher = useTeacherById(teacherId);

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Book trial lesson</h3>
            <p className={styles.description}>
                Our experienced tutor will assess your current language level, discuss
                your learning goals, and tailor the lesson to your specific needs.
            </p>
            {teacher && (
                <div className={styles.wrapperTeacher}>
                    <Image
                        className={styles.image}
                        src={teacher.avatar_url}
                        alt={teacher.name}
                        width={44}
                        height={44}
                        priority={true}
                    />
                    <div className={styles.wrapperName}>
                        <p className={styles.titleTeacher}>Your teacher</p>
                        <p className={styles.nameTeacher}>{teacher.name}</p>
                    </div>
                </div>
            )}
            <BookForm languages={teacher?.languages || []} teacherId={teacherId} />
        </div>
    );
};

export default BookModal;
