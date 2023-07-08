import { OrmPrismaService } from '@cypher/api/shared/database/orm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomRepository {
  constructor(private readonly prisma: OrmPrismaService) {}

  getRoom(roomId: string) {
    return this.prisma.room.findUnique({ where: { id: roomId } });
  }

  getRooms() {
    return this.prisma.room.findMany();
  }
}
