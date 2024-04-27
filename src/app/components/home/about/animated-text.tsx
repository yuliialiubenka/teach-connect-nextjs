'use client';

import { TypeAnimation } from 'react-type-animation';
import styles from './about.module.scss';

export default function AnimatedText() {
    return (
        <TypeAnimation
            sequence={[
                'French',
                2000,
                'German',
                2000,
                'English',
                2000,
                'Spanish',
                2000,
                'Italian',
                2000,
                'Korean',
                2000,
                'Chinese',
                2000,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{}}
            className={styles.animatedText}
        />
    );
};