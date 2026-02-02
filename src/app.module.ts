import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { SignalingModule } from './signaling/signaling.module';

@Module({
  imports: [UsersModule, AuthModule, RoomsModule, SignalingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
