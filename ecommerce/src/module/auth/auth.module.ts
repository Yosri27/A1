  import { Module } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { AuthController } from './auth.controller';
  import { userModel } from 'src/DB/models/user.model';
  import { JwtModule } from '@nestjs/jwt';
  import { ConfigModule, ConfigService } from '@nestjs/config';
  import { env } from 'src/config';
  import type { StringValue } from 'ms';
import { CacheModule } from '@nestjs/cache-manager';


  @Module({
    imports: [
      userModel,
      ConfigModule,
          JwtModule.registerAsync({
      imports: [ConfigModule],

      useFactory: async () => ({
        secret: env.JWT_SECRET,
        signOptions: {
          expiresIn: env.JWT_EXPIRATION as StringValue,
        },
      }),
    }),
    
        CacheModule.register({ isGlobal : true, store:'redis',ttl : 5000})
  ],
  
          

    
    controllers: [AuthController],
    providers: [AuthService],
  })
    export class AuthModule { }
