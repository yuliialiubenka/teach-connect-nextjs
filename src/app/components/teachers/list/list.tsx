'use client';

import React, { useState } from 'react';
import TeacherCard from "../card/card";
import { useSelector } from 'react-redux';
import database from '../../../../lib/firebase/firebase';
import { useTeachers } from '../../../../lib/firebase/getTeachers';
import Filter from "../filter/filter";
import StyledPagination from "../pagination/pagination";
import Image from 'next/image';
import img from '../../../../../public/images/searching-data.svg';
import styles from "./list.module.scss";

const PAGE_SIZE = 4;

export default function TeachersList({ }) {
    const teachers = useTeachers(database);
    const filter = useSelector((state: RootState) => state.filter);
    const filtredTeachers = useSelector((state: RootState) => state.filter.filterTeachers);
    const isFilterActive = Object.values(filter.name).some(value => value !== '');
    const teachersData = isFilterActive ? filtredTeachers : teachers;

    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(teachersData.length / PAGE_SIZE);
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedTeachers = teachersData.slice(startIndex, endIndex);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <>
            <Filter />
            <div className={styles.wrapper}>
                {teachersData.length !== 0 &&
                    <ul className={styles.list}>
                        {paginatedTeachers.map((teacher: any) => (
                            <TeacherCard
                                key={teacher.id}
                                teacher={teacher}
                                page='teachers'
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

                {isFilterActive && filtredTeachers.length === 0 && (
                    <div className={styles.notFound}>
                        <Image
                            src={img}
                            alt="Not found"
                            width={400}
                            height={240}
                        />
                        <p className={styles.notFoundText}>
                            Unfortunately, we could not find a teacher that matches your criteria.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}