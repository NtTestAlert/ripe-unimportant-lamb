import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:['.env.local', '.env'], isGlobal:true }),
    TypeOrmModule.forRoot(),
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
