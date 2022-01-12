import { EventStatus } from "@prisma/client";
import { database } from "~root/app";
import ExtendedPrismaEvent from "~root/types/extendedPrismaEvent";
const addEventRepo = async ({
  name,
  fromDate,
  toDate,
  ownerId,
}: Omit<ExtendedPrismaEvent, "eventStatus">) => {
  await database.event.create({
    data: {
      name,
      fromDate,
      toDate,
      ownerId: ownerId,
      eventStatus: EventStatus.IN_PROGRESS,
      // ownerId: { connect: { id: ownerId } },
    },
  });
};

export default addEventRepo;
