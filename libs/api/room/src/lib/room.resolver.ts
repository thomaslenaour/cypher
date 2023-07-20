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
import { ToggleMyselfFromQueueInput } from './dtos/toggle-myself-from-queue.input';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '@cypher/api/authentication';

@Resolver(() => RoomObjectType)
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Mutation(() => String)
  joinRoom(
    @Args('data') data: JoinRoomInput,
    @CurrentUser() user?: { userId: string }
  ) {
    return this.roomService.getRoomAccessToken({
      roomId: data.roomId,
      userId: user?.userId,
    });
  }

  @UseGuards(GqlAuthGuard)
  // @Mutation(() => Boolean)
  async toggleMyselfFromQueue(
    @Args('data') data: ToggleMyselfFromQueueInput
    // @CurrentUser() user: { userId: string }
  ) {
    const newParticipant = await this.roomService.toggleMyselfFromQueue({
      ...data,
      userId: 'xxxx',
    });

    console.log('newParticipant', newParticipant);

    return true;
  }

  @Query(() => [RoomObjectType])
  async rooms() {
    return await this.roomService.getRooms();
  }

  @ResolveField('participantsNumber', () => Number)
  async participantsNumber(@Parent() room: Room) {
    return await this.roomService.getParticipantsNumber(room.name);
  }
}
