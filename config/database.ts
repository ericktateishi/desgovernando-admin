export default ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', 'iu51mf0q32fkhfpl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'mzjcbhknlbitvbj1'),
      user: env('DATABASE_USERNAME', 'dsbud702369ug96m'),
      password: env('DATABASE_PASSWORD', 'p001f6j5g8swjkn6'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
