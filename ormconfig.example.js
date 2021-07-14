module.exports = [
  {
    name: 'default',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    extra: {
      ssl: process.env.TYPEORM_SSL,
    },
    entities: [process.env.TYPEORM_ENTITIES],
    migrations: [process.env.TYPEORM_MIGRATION],
    cli: {
      migrationsDir: './src/shared/infra/typeorm/migrations/',
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    host: process.env.TYPEORM_MONGODB_HOST,
    port: process.env.TYPEORM_MONGODB_PORT,
    username: process.env.TYPEORM_MONGODB_USER,
    password: process.env.TYPEORM_MONGODB_PASS,
    database: process.env.TYPEORM_MONGODB_DBNAME,
    useUnifiedTopology: true,
    entities: [process.env.TYPEORM_MONGODB_SCHEMAS],
  },
];
