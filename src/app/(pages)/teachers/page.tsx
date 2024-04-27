import React from 'react';
import TeachersList from "@/app/components/teachers/list/list";
import styles from "../../styles/page.module.scss";

export default async function TeachersPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <section className={styles.section}>
                    <TeachersList />
                </section>
            </div>
        </main>
    );
}
