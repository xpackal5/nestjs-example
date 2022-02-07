module.exports = {
  type: 'mariadb',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  logging: true,
  synchronize: false,
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
