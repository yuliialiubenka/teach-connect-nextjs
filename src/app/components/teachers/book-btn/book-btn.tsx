'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../../lib/firebase/firebase';
import { BookBtnProps } from '@/typings';
import Image from 'next/image';
import img from '../../../../../public/images/access-denied.svg'
import styles from './book-btn.module.scss';

const BookBtn: React.FC<BookBtnProps> = ({ teacherId, page }) => {
    const router = useRouter();
    const user = auth.currentUser;
    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        if (!user) {
            setShowTooltip(true);
            setTimeout(() => {
                setShowTooltip(false);
            }, 3000);
            return;
        } else {
            router.push(`/${page}/book-lesson/${teacherId}`, { scroll: false });
        }
    };

    return (
        <>
            <button className={styles.button} onClick={handleClick}>
                Book trial lesson
            </button>
            {showTooltip && (
                <div className='tooltip'>
                    <Image
                        className='tooltipImg'
                        src={img}
                        alt="Log In"
                        width={400}
                        height={312}
                        priority={true}
                    />
                    <p className='tooltipText'>
                        Please, register or log in to book trial lesson.
                    </p>
                </div>
            )}
        </>


    );
}

export default BookBtn;
