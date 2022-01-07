import { database } from "~root/app";
import ExtendedPrismaEvent from "~root/types/extendedPrismaEvent";
const addEventRepo = async ({
  name,
  fromDate,
  toDate,
  participantId,
}: ExtendedPrismaEvent) => {
  await database.event.create({
    data: {
      name,
      fromDate,
      toDate,
      //   participantId:participantId
      participant: { connect: { id: participantId } },
    },
  });
};

export default addEventRepo;
