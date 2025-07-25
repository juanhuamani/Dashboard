import { NextResponse } from 'next/server';
const WebHDFS = require('webhdfs');

const hdfs = WebHDFS.createClient({
  user: 'hdfs',
  host: 'localhost',
  port: 9870,
  path: '/webhdfs/v1'
});

const fakeData = {
  topSongs: [
    { song_title: 'Blinding Lights', artist_name: 'The Weeknd', plays: 1200, listeners: 200, growth: 5.2, genre: 'Pop' },
    { song_title: 'Shape of You', artist_name: 'Ed Sheeran', plays: 1100, listeners: 180, growth: 3.8, genre: 'Pop' },
    { song_title: 'Stay', artist_name: 'The Kid LAROI', plays: 950, listeners: 150, growth: 2.1, genre: 'Hip Hop' },
    { song_title: 'Good 4 U', artist_name: 'Olivia Rodrigo', plays: 900, listeners: 140, growth: 1.5, genre: 'Pop' },
    { song_title: 'Bad Habits', artist_name: 'Ed Sheeran', plays: 850, listeners: 130, growth: 0.9, genre: 'Pop' },
  ],
  latestPlays: [
    { user_id: 'user_001', song_title: 'Watermelon Sugar', artist_name: 'Harry Styles', timestamp: '12:01', location: 'Madrid, ES', device: 'Mobile' },
    { user_id: 'user_002', song_title: 'Levitating', artist_name: 'Dua Lipa', timestamp: '12:02', location: 'Barcelona, ES', device: 'Desktop' },
  ],
  metrics: {
    activeUsers: 9500,
    playsPerMinute: 1500,
    activeSongs: 350,
    avgSessionTime: 135.2,
    peakConcurrent: 6000,
    totalBandwidth: 120.5,
  },
  activityData: [
    { time: '12:00', users: 9000, plays: 14000, bandwidth: 100 },
    { time: '12:05', users: 9500, plays: 15000, bandwidth: 120 },
  ]
};

export async function GET() {
  return new Promise((resolve) => {
    const remoteFileStream = hdfs.createReadStream('/user/spark/realtime.csv');
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
      const topSongs = rows.map(row => {
        const values = row.split(',');
        return Object.fromEntries(keys.map((k, i) => [k, values[i]]));
      });
      // El resto igual que fake
      resolve(NextResponse.json({ ...fakeData, topSongs }));
    });
  });
} 