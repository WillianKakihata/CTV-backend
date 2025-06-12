import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ForumModule } from './forum/forum.module';


@Module({
  imports: [
  ConfigModule.forRoot({ isGlobal: true }),
  JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        secret: cs.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      global: true,
    }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB_URI'),
    }),
  }),
  UserModule,
  AuthModule,
  ForumModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
