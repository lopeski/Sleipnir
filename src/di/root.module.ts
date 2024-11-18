import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PresentationModule } from '@di/presentation.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'rootpassword',
      database: 'mydatabase',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    PresentationModule,
  ],
})
export class RootModule {}
