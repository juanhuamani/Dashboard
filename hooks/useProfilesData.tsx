import { useEffect, useState } from 'react';

export function useProfilesData() {
  const [data, setData] = useState({ usersData: [], userActivityData: [], subscriptionData: [], genrePreferences: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/profiles')
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