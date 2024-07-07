import { useCallback } from 'react';
import { FavoriteDog } from '@/models/favorite';
import { useLocalStorageState } from './useLocalStorageState';

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorageState<FavoriteDog[]>({
    storageKey: 'dogBreeds.favorites',
    initialState: [],
  });

  const addFavorite = useCallback(
    (favorite: FavoriteDog) => {
      setFavorites((prev) => [...prev, favorite]);
    },
    [setFavorites]
  );

  const removeFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    },
    [setFavorites]
  );

  const isFavorite = useCallback(
    (id: string) => {
      return favorites.some((fav) => fav.id === id);
    },
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite };
};
