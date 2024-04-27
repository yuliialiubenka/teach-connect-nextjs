'use client';

import React, { useState } from 'react';
import TeacherCard from "../card/card";
import database from '../../../../lib/firebase/firebase';
import { useFavorite } from '../../../../lib/firebase/getFavorites';
import StyledPagination from "../pagination/pagination";
import Image from 'next/image';
import img from '../../../../../public/images/empty-box.svg'
import styles from "./favorites-list.module.scss";

const PAGE_SIZE = 4;

export default function FavoritesList({ }) {
    const favorites = useFavorite(database);

    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(favorites.length / PAGE_SIZE);
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedTeachers = favorites.slice(startIndex, endIndex);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <>
            {paginatedTeachers.length !== 0 &&
                <ul className={styles.list}>
                    {paginatedTeachers.map((teacher: any) => (
                        <TeacherCard
                            key={teacher.id}
                            teacher={teacher}
                            page='favorites'
                        />
                    ))}
                </ul>
            }

            {paginatedTeachers.length !== 0 && totalPages > 1 &&
                <StyledPagination
                    currentPage={page}
                    totalPages={totalPages}
                    onChange={handlePageChange}
                />
            }

            {favorites && paginatedTeachers.length === 0 && (
                <div className={styles.noTeachers}>
                    <Image
                        className={styles.noTeachersImg}
                        src={img}
                        alt="No teachers"
                        width={400}
                        height={240}
                        priority={true}
                    />
                    <p className={styles.noTeachersText}>You have not added teachers to your favorites list yet.</p>
                </div>
            )}
        </>
    );
}