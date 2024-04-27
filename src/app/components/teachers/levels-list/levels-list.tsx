'use client';

import React, { useEffect } from 'react';
import styles from './levels-list.module.scss';
import { useSelector } from 'react-redux';
import { LevelsListProps, RootState } from '@/typings';

const LevelsList: React.FC<LevelsListProps> = ({ levels }) => {
    const selectedLevels = useSelector((state: RootState) => state.filter.selectedLevels !== "" ? state.filter.selectedLevels : 'A1 Beginner');

    return (
        <ul className={styles.list}>
            {levels.map((level, index) => (
                <li
                    key={index}
                    className={`${styles.item} ${level === selectedLevels ? styles.active : ''}`}
                >
                    <p>{level}</p>
                </li>
            ))}
        </ul>
    );
};

export default LevelsList;