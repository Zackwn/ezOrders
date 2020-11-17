export const databaseConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'ezorders',
  password: process.env.DB_PASS || 'docker',
  port: Number(process.env.DB_PORT) || 5432,
}