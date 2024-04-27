'use client'

import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { set, ref, remove } from 'firebase/database';
import database, { auth } from '../../../../lib/firebase/firebase';
import { useFavorite } from '../../../../lib/firebase/getFavorites';
import Image from 'next/image';
import img from '../../../../../public/images/access-denied.svg'
import { LikeBtnProps } from '@/typings';
import styles from "./like-btn.module.scss";

export default function LikeBtn({ id, teacher }: LikeBtnProps) {
    const favorites = useFavorite(database);
    const isFavorite = favorites.find(item => item.id === id);
    const user = auth.currentUser;
    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick = (id: string) => {
        if (!user) {
            setShowTooltip(true);
            setTimeout(() => {
                setShowTooltip(false);
            }, 3000);
            return;
        } else {
            if (isFavorite) {
                return deleteFavorite(id);
            } else {
                return addFavorite(id);
            }
        }
    };

    const deleteFavorite = (id: string) => {
        if (user) {
            const favRef = ref(database, `/favorites/${user.uid}/${id}`);
            return remove(favRef);
        }
    };

    const addFavorite = (id: string) => {
        if (user) {
            const favRef = ref(database, `/favorites/${user.uid}/${id}`);
            set(favRef, teacher);
        }
    };

    return (
        <>
            <button
                className={styles.like}
                type="button"
                onClick={() => handleClick(id)}
            >
                {isFavorite && user ? (
                    <FaHeart color="#F4C550" />
                ) : (
                    <FaRegHeart />
                )}
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
                        Please, register or log in to add the teacher to your favorites list.
                    </p>
                </div>
            )}
        </>
    )
};