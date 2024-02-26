import { Controller, Post, Body } from '@nestjs/common';
import { LikesGateway } from './likes.gateway';

@Controller()
export class LikesController {
  constructor(private readonly likesGateway: LikesGateway) {}

  @Post()
  likePost(@Body() newLike: any) {
    this.likesGateway.handleNewLike(newLike);
  }
}