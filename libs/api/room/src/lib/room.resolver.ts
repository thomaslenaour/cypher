import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RoomService } from './room.service';

import { JoinRoomInput } from './dtos/join-room.input';

@Resolver()
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Mutation(() => String)
  joinRoom(@Args('data') data: JoinRoomInput) {
    return this.roomService.getRoomAccessToken({ roomId: data.roomId });
  }
}
