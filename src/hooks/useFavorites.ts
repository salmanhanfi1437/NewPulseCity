import { useEffect, useState } from 'react';
import { TMEvent } from '../api/ticketmaster';
import { getItem, setItem } from '../utils/storage';

const KEY = 'favorites_v1';

export function useFavorites() {
  const [favorites, setFavorites] = useState<TMEvent[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await getItem<TMEvent[]>(KEY);
      if (stored) setFavorites(stored);
    })();
  }, []);

  async function toggleFavorite(event: TMEvent) {
    setFavorites(prev => {
      const exists = prev.find(e => e.id === event.id);
      let next: TMEvent[];
      if (exists) {
        next = prev.filter(e => e.id !== event.id);
      } else {
        next = [event, ...prev];
      }
      setItem(KEY, next).catch(console.warn);
      return next;
    });
  }

  function isFavorite(id: string) {
    return favorites.some(f => f.id === id);
  }
  return { favorites, toggleFavorite, isFavorite };
}
