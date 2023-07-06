import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RoomService } from './room.service';

import { JoinRoomInput } from './dtos/join-room.input';
import { RoomObjectType } from './models/room.model';
import { Room } from '@prisma/client';

@Resolver(() => RoomObjectType)
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Mutation(() => String)
  joinRoom(@Args('data') data: JoinRoomInput) {
    return this.roomService.getRoomAccessToken({ roomId: data.roomId });
  }

  @Query(() => [RoomObjectType])
  async rooms() {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    await delay(1000);
    return await this.roomService.getRooms();
  }

  @ResolveField('participantsNumber', () => Number)
  async participantsNumber(@Parent() room: Room) {
    return await this.roomService.getParticipantsNumber(room.name);
  }
}
