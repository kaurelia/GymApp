import { database } from "~root/app";
import ExtendedPrismaEvent from "~root/types/extendedPrismaEvent";
const addEventRepo = ({
  name,
  fromDate,
  toDate,
  participantId,
}: ExtendedPrismaEvent) => {
  database.event.create({
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
