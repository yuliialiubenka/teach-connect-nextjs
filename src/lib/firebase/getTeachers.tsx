import { useState, useEffect } from 'react';
import { ref, DataSnapshot, get, child } from 'firebase/database';

export const useTeachers = (database: any) => {
    const [teachers, setTeachers] = useState<any[]>([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const TEACHERS_DATA = 'teachers';
                const dataBaseRef = ref(database);
                const teachersSnapshot: DataSnapshot = await get(child(dataBaseRef, TEACHERS_DATA));

                if (teachersSnapshot.exists()) {
                    const teachersData = teachersSnapshot.val();
                    const teachersArray = Object.keys(teachersData).map(key => ({
                        id: key,
                        ...teachersData[key]
                    }));

                    setTeachers(teachersArray);
                } else {
                    console.log('No teachers found');
                }
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();

    }, [database]);

    return teachers;
};