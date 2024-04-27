'use client';

import React from 'react';
import styles from '../styles/page.module.scss';
import Image from 'next/image';
import img from '../../../public/images/web-maintenance.svg';

export default function ErrorComponent({ error }: { error: Error }) {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <section className={`${styles.section} ${styles.notFoundPage}`}>
          <Image
            className={styles.notFoundPageImg}
            src={img}
            alt="Error"
            width={400}
            height={240}
            priority={true}
          />
          <p className={styles.info}>{`Something went wrong. ${error.message}`}</p>
        </section>
      </div>
    </main>
  );
}
