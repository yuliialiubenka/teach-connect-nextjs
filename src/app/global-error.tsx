'use client';

import React from 'react';
import Image from 'next/image';
import img from '../../public/images/web-maintenance.svg';
import styles from './styles/page.module.scss';

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body>
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
              <p className={styles.info}>{`Something globally went wrong. ${error.message}`}</p>
            </section>
          </div>
        </main>
      </body>
    </html>
  );
}
