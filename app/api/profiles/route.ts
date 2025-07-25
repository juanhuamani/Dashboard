import { NextResponse } from 'next/server';
const WebHDFS = require('webhdfs');

const hdfs = WebHDFS.createClient({
  user: 'hdfs',
  host: 'localhost',
  port: 9870,
  path: '/webhdfs/v1'
});

const fakeData = {
  usersData: [
    { id: 'user_001', name: 'María González', email: 'maria.gonzalez@email.com', avatar: '/placeholder.svg', location: 'Madrid, España', joinDate: '2023-01-15', totalPlays: 15420, favoriteGenre: 'Pop', listeningTime: 2340, topArtist: 'Taylor Swift', subscription: 'Premium', lastActive: 'Hace 2 horas' },
    { id: 'user_002', name: 'Carlos Rodríguez', email: 'carlos.rodriguez@email.com', avatar: '/placeholder.svg', location: 'Barcelona, España', joinDate: '2022-11-08', totalPlays: 23150, favoriteGenre: 'Rock', listeningTime: 3890, topArtist: 'Imagine Dragons', subscription: 'Free', lastActive: 'Hace 1 hora' },
  ],
  userActivityData: [
    { hour: '00', users: 1200 },
    { hour: '04', users: 800 },
  ],
  subscriptionData: [
    { type: 'Premium', count: 65, color: '#8b5cf6' },
    { type: 'Free', count: 35, color: '#06b6d4' },
  ],
  genrePreferences: [
    { genre: 'Pop', users: 2840 },
    { genre: 'Rock', users: 2150 },
  ]
};

export async function GET() {
  return new Promise((resolve) => {
    const remoteFileStream = hdfs.createReadStream('/user/spark/profiles.csv');
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
      const usersData = rows.map(row => {
        const values = row.split(',');
        return Object.fromEntries(keys.map((k, i) => [k, values[i]]));
      });
      resolve(NextResponse.json({ ...fakeData, usersData }));
    });
  });
} 