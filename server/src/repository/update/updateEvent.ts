import { database } from "~root/app";
import ExtendedPrismaEvent from "~root/types/extendedPrismaEvent";

const updateEventRepo = async ({
  eventId,
  ownerId,
  ...rest
}: Partial<ExtendedPrismaEvent> & { eventId: number; ownerId: number }) => {
  await database.event.updateMany({
    where: {
      id: eventId,
      ownerId: ownerId,
    },
    data: {
      ...rest,
    },
  });
};
export default updateEventRepo;
