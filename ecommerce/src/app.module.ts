import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/users/user.module';
import { ProductModule } from './module/product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { env } from './config';
import { AuthModule } from './module/auth/auth.module';
import { BrandModule } from './module/brand/brand.module';
import { CategoryModule } from './module/category/category.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env.prod'],
      isGlobal: true
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRoot('mongodb://localhost/test', {
      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => console.log('database connected'));
        return connection;
      },
    }),
    UserModule,
    ProductModule,
    AuthModule,
    BrandModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
