import React from 'react';
import FavoritesList from "@/app/components/teachers/favorites-list/favorites-list";
import styles from "../../styles/page.module.scss";

export default async function FavoritesPage() {

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <section className={styles.section}>
                    <FavoritesList />
                </section>
            </div>
        </main>
    );
}
