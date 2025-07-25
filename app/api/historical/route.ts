import { NextResponse } from 'next/server';
const WebHDFS = require('webhdfs');

const hdfs = WebHDFS.createClient({
  user: 'hdfs',
  host: 'localhost',
  port: 9870,
  path: '/webhdfs/v1'
});

const fakeData = {
  topSongsData: {
    week: [
      { song_title: 'Flowers', artist_name: 'Miley Cyrus', total_plays: 8420, growth: 15.2, revenue: 421 },
      { song_title: 'Anti-Hero', artist_name: 'Taylor Swift', total_plays: 7830, growth: 12.8, revenue: 391 },
      { song_title: 'Unholy', artist_name: 'Sam Smith', total_plays: 7290, growth: -2.1, revenue: 364 },
      { song_title: 'As It Was', artist_name: 'Harry Styles', total_plays: 6560, growth: -8.5, revenue: 328 },
      { song_title: 'Bad Habit', artist_name: 'Steve Lacy', total_plays: 6140, growth: 5.7, revenue: 307 },
    ],
    month: [
      { song_title: 'As It Was', artist_name: 'Harry Styles', total_plays: 15420, growth: 8.3, revenue: 771 },
      { song_title: 'Heat Waves', artist_name: 'Glass Animals', total_plays: 14230, growth: -3.2, revenue: 711 },
      { song_title: 'Stay', artist_name: 'The Kid LAROI', total_plays: 13890, growth: 12.1, revenue: 694 },
      { song_title: 'Bad Habits', artist_name: 'Ed Sheeran', total_plays: 12560, growth: -1.8, revenue: 628 },
      { song_title: 'Good 4 U', artist_name: 'Olivia Rodrigo', total_plays: 11340, growth: 6.9, revenue: 567 },
    ],
  },
  genreTrendsData: [
    { date: 'Ene', Pop: 4000, Rock: 2400, Hip_Hop: 2400, Electronic: 1800, Reggaeton: 1200, Country: 800 },
    { date: 'Feb', Pop: 3000, Rock: 1398, Hip_Hop: 2210, Electronic: 2200, Reggaeton: 1400, Country: 900 },
  ],
  deviceUsageData: [
    { device_type: 'Móvil', percentage: 65, color: '#3b82f6', icon: '📱', growth: 8.2 },
    { device_type: 'Escritorio', percentage: 25, color: '#10b981', icon: '💻', growth: -2.1 },
  ],
  timeAnalysisData: [
    { hour: '00:00', users: 1200, plays: 3400 },
    { hour: '02:00', users: 800, plays: 2100 },
  ],
  regionData: [
    { region: 'España', users: 45000, plays: 2800000, revenue: 140000 },
    { region: 'México', users: 38000, plays: 2400000, revenue: 96000 },
  ]
};

export async function GET() {
  return new Promise((resolve) => {
    const remoteFileStream = hdfs.createReadStream('/user/spark/historical.csv');
    let data = '';

    remoteFileStream.on('data', (chunk: string) => {
      data += chunk;
    });

    remoteFileStream.on('error', (_err: any) => {
      resolve(NextResponse.json(fakeData));
    });

    remoteFileStream.on('end', () => {
      const [header, ...rows] = data.trim().split('\n');
      const keys = header.split(',');
      const topSongsData: Record<string, any[]> = {};
      rows.forEach(row => {
        const values = row.split(',');
        const obj = Object.fromEntries(keys.map((k, i) => [k, values[i]]));
        const period = obj['period'] || 'month';
        if (!topSongsData[period]) topSongsData[period] = [];
        topSongsData[period].push(obj);
      });
      resolve(NextResponse.json({ ...fakeData, topSongsData }));
    });
  });
} 