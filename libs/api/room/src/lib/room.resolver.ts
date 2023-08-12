import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RoomService } from './services/room.service';

import { JoinRoomInput } from './dtos/join-room.input';
import { RoomObjectType } from './models/room.model';
import { Room } from '@prisma/client';
import { ToggleMyselfFromQueueInput } from './dtos/toggle-myself-from-queue.input';
import { CurrentUser, GqlAuthGuard } from '@cypher/api/authentication';
import { UseGuards } from '@nestjs/common';
import { RoomQueueService } from './services/queue.service';
import { StartPublishingInput } from './dtos/start-publishing.input';

@Resolver(() => RoomObjectType)
export class RoomResolver {
  constructor(
    private readonly roomService: RoomService,
    private readonly roomQueueService: RoomQueueService
  ) {}

  @Mutation(() => String)
  joinPublicRoom(@Args('data') data: JoinRoomInput) {
    return this.roomService.getRoomAccessToken({
      roomId: data.roomId,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  joinRoom(
    @Args('data') data: JoinRoomInput,
    @CurrentUser() user: { userId: string }
  ) {
    return this.roomService.getRoomAccessToken({
      roomId: data.roomId,
      userId: user?.userId || '',
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async toggleMyselfFromQueue(
    @Args('data') data: ToggleMyselfFromQueueInput,
    @CurrentUser() user: { userId: string }
  ) {
    const newParticipant = await this.roomQueueService.toggleMyselfFromQueue({
      ...data,
      userId: user.userId,
    });

    console.log('newParticipant', newParticipant);

    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async startPublishing(
    @Args('data') data: StartPublishingInput,
    @CurrentUser() user: { userId: string }
  ) {
    const participant = await this.roomService.startPublishing({
      ...data,
      userId: user.userId,
    });

    return !!participant;
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
