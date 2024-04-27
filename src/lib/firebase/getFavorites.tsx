import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ref, onValue } from 'firebase/database';
import { auth } from './firebase';
import { RootState } from '@/typings';

export const useFavorite = (database: any) => {

  const [favorites, setFavorite] = useState<any[]>([]);
  const authUser = useSelector((state: RootState) => state.authUser.token);

  useEffect(() => {
    if (!authUser) return;
    auth.onAuthStateChanged(user => {
      if (user) {
        const currentUser = auth.currentUser;
        if (currentUser) {
          onValue(
            ref(database, `/favorites/${currentUser.uid}`),
            snapshot => {
              setFavorite([]);
              const data = snapshot.val();
              if (data !== null) {
                Object.values(data).map(model =>
                  setFavorite(prev => [...prev, model])
                );
              }
            }
          );
        }
      }
    });
  }, [authUser, database]);

  return favorites;
};
