import { Pool, PoolConfig } from "pg";

declare const process: {
  env: {
    PGUSER: string;
    PGHOST: string;
    PGDATABASE: string;
    PGPASSWORD: string;
    PGPORT: number;
  };
};

const poolConfig: PoolConfig = {
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "fuceti",
  password: process.env.PGPASSWORD || "password",
  port: process.env.PGPORT || 5432,
};

const pool = new Pool(poolConfig);
pool.once('connect', ()=> console.log('DB connected.'))
pool.on('error', (err) => console.log(err))

export default pool;
