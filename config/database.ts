export default ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'desgovernando'),
      user: env('DATABASE_USERNAME', 'admin'),
      password: env('DATABASE_PASSWORD', '12345'),
      ssl: env.bool('DATABASE_SSL', false),
      charset   : 'utf8mb4',
      collation : 'utf8mb4_unicode_ci'
    },
  },
});
