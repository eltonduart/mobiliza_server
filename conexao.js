APP_SECRET=

APP_WEB_URL=http://localhost:3000
APP_API_URL=http://localhost:3333

#Mail
MAIL_DRIVER=ethereal

#Aws
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY_ID=
AWS_DEFAULT_REGION=

#Storage
STORAGE_DRIVER=disk

#Pg
DATABASE_URL=postgres://postgres:578184@localhost:5432/mobiliza

#Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASS=

TYPEORM_MIGRATION=./src/shared/infra/typeorm/migrations/*.ts
TYPEORM_ENTITIES=./src/modules/**/infra/typeorm/entities/*.ts
TYPEORM_MIGRATION_DIR=./src/shared/infra/typeorm/migrations/
TYPEORM_MONGODB_SCHEMAS=./src/modules/**/infra/typeorm/schemas/*.ts

TYPEORM_MONGODB_DBNAME=maiscidadao
TYPEORM_MONGODB_HOST=localhost
TYPEORM_MONGODB_PASS=
TYPEORM_MONGODB_PORT=27017
TYPEORM_MONGODB_SCHEMAS=./dist/modules/**/infra/typeorm/schemas/*.ts
TYPEORM_MONGODB_USER=
