import React from 'react';
import BookModal from '../../../../components/teachers/book-modal/book-modal';
import styles from "../../../../styles/page.module.scss";
import { Params } from '@/typings';

export default async function Page({ params }: Params) {
    const { teacherId } = params;

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <section className={styles.section}>
                    <BookModal teacherId={teacherId} />
                </section>
            </div>
        </main>
    )
}
