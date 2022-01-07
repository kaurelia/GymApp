import { database } from "~root/app";
import ExtendedPrismaEvent from "~root/types/extendedPrismaEvent";

const updateEventRepo = async ({
  eventId,
  extendedPrismaEvent,
}: {
  eventId: number;
  extendedPrismaEvent: Partial<Omit<ExtendedPrismaEvent, "participantId">>;
}) => {
  await database.event.update({
    where: {
      id: eventId,
    },
    data: {
      ...extendedPrismaEvent,
    },
  });
};
export default updateEventRepo;
