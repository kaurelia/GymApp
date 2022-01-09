import { database } from "~root/app";
import ExtendedPrismaEvent from "~root/types/extendedPrismaEvent";
const addEventRepo = async ({
  name,
  fromDate,
  toDate,
  ownerId,
}: ExtendedPrismaEvent) => {
  await database.event.create({
    data: {
      name,
      fromDate,
      toDate,
      ownerId: ownerId,
      // ownerId: { connect: { id: ownerId } },
    },
  });
};

export default addEventRepo;
