import { NextResponse } from 'next/server';
const WebHDFS = require('webhdfs');

const hdfs = WebHDFS.createClient({
  user: 'hdfs',
  host: 'localhost', // Cambia esto si tu NameNode está en otro host
  port: 9870,        // Cambia si tu NameNode usa otro puerto
  path: '/webhdfs/v1'
});

export async function GET() {
  return new Promise((resolve) => {
    const remoteFileStream = hdfs.createReadStream('/user/spark/output/resultados.csv');
    let data = '';

    remoteFileStream.on('data', (chunk) => {
      data += chunk;
    });

    remoteFileStream.on('error', (err) => {
      resolve(NextResponse.json({ error: err.message }, { status: 500 }));
    });

    remoteFileStream.on('end', () => {
      // Procesar CSV a JSON (simple, solo para ejemplo)
      const [header, ...rows] = data.trim().split('\n');
      const keys = header.split(',');
      const json = rows.map(row => {
        const values = row.split(',');
        return Object.fromEntries(keys.map((k, i) => [k, values[i]]));
      });
      resolve(NextResponse.json(json));
    });
  });
} 