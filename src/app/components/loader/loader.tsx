import React from 'react';
import img from '../../../../public/images/girl.png';
import styles from './loader.module.scss';
import Image from 'next/image';
import { LoaderProps } from '@/typings';

const Loader: React.FC<LoaderProps> = ({ title }) => {
    return (
        <div className={styles.section}>
            <div className={styles.wrapper}>
                <Image src={img} alt="Loader..." className={styles.image} width="100" priority={true} />
                <p className={styles.title}>{title}</p>
            </div>
        </div>
    );
};

export default Loader;
