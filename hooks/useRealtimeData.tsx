import { useEffect, useState } from 'react';

export function useRealtimeData() {
  const [data, setData] = useState({ topSongs: [], latestPlays: [], metrics: {}, activityData: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/realtime')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { ...data, loading, error };
} 