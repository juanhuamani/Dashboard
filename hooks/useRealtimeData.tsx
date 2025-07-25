import { useEffect, useState } from 'react';

export function useRealtimeData(refetchDeps: any[] = []) {
  const [data, setData] = useState({ topSongs: [], latestPlays: [], metrics: {}, activityData: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
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
    // eslint-disable-next-line
  }, refetchDeps);

  return { ...data, loading, error };
} 