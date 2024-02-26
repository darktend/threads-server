import { Module } from '@nestjs/common';
import { LikesGateway } from './likes.gateway';

@Module({
  providers: [LikesGateway],
})
export class LikesModule {}