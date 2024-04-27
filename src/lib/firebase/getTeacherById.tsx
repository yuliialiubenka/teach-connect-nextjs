import { ref, child, get } from 'firebase/database';
import database from './firebase';
import { useEffect, useState } from 'react';

const TEACHERS_DATA = 'teachers';
const databaseRef = ref(database);

export function useTeacherById(teacherId: string) {
    const [teacher, setTeacher] = useState<any>(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const teachersSnapshot = await get(child(databaseRef, `${TEACHERS_DATA}`));
                if (teachersSnapshot.exists()) {
                    const teachersData = teachersSnapshot.val();
                    for (const teacherKey in teachersData) {
                        const teacher = teachersData[teacherKey];
                        if (teacher.id === teacherId) {
                            setTeacher(teacher);
                            return;
                        }
                    }
                }
                setTeacher(null);
            } catch (error) {
                console.error('Error getting teacher by ID:', error);
                setTeacher(null);
            }
        };

        fetchTeacher();
    }, [teacherId]);

    return teacher;
}
