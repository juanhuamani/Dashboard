import { NextResponse } from 'next/server';
const WebHDFS = require('webhdfs');

const hdfs = WebHDFS.createClient({
  user: 'hdfs',
  host: 'localhost',
  port: 9870,
  path: '/webhdfs/v1'
});

const fakeData = {
  revenueData: [
    { month: 'Ene', revenue: 45000, subscriptions: 1200, churn: 5.2 },
    { month: 'Feb', revenue: 52000, subscriptions: 1350, churn: 4.8 },
  ],
  performanceData: [
    { metric: 'Tiempo de carga promedio', value: '1.2s', change: '-15%', status: 'good' },
    { metric: 'Uptime del servicio', value: '99.9%', change: '+0.1%', status: 'excellent' },
  ],
  topContent: [
    { rank: 1, title: 'Blinding Lights', artist: 'The Weeknd', plays: 2840000, revenue: 14200 },
    { rank: 2, title: 'Shape of You', artist: 'Ed Sheeran', plays: 2650000, revenue: 13250 },
  ],
  reports: [
    { id: 1, title: 'Reporte Mensual de Ingresos', description: 'Análisis detallado de ingresos y suscripciones del mes actual', type: 'Financiero', date: '2024-01-15', status: 'Completado', size: '2.4 MB' },
    { id: 2, title: 'Análisis de Comportamiento de Usuario', description: 'Patrones de uso y preferencias musicales de los usuarios', type: 'Analítico', date: '2024-01-14', status: 'Completado', size: '1.8 MB' },
  ]
};

export async function GET() {
  return new Promise((resolve) => {
    const remoteFileStream = hdfs.createReadStream('/user/spark/reports.csv');
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
      const revenueData = rows.map(row => {
        const values = row.split(',');
        return Object.fromEntries(keys.map((k, i) => [k, values[i]]));
      });
      resolve(NextResponse.json({ ...fakeData, revenueData }));
    });
  });
} 