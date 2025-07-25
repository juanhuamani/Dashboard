import { useEffect, useState } from 'react';

export function useHistoricalData() {
  const [data, setData] = useState({ topSongsData: {}, genreTrendsData: [], deviceUsageData: [], timeAnalysisData: [], regionData: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/historical')
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