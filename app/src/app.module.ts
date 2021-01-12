import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:['.env.local', '.env'], isGlobal:true }),
    TypeOrmModule.forRoot({
      "name": "default",
      "type": "mariadb",
      "host": process.env.TYPEORM_HOST || "maria",
      "port": 3306,
      "username": "testuser",
      "password": "testpassword",
      "database": "testdatabase",
      "entities": ["**/*.entity{ .ts,.js}"],
      "synchronize": false,
      "migrations": ["dist/migrations/*{.ts,.js}"],
      "migrationsTableName": "migrations_typeorm",
      "migrationsRun": true,
      "autoLoadEntities": true
    }),
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

