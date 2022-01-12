import { Event as PrismaEvent } from "@prisma/client";

type ExtendedPrismaEvent = Omit<PrismaEvent, "id"> & {
  toDate: string | Date;
  fromDate: string | Date;
};
export default ExtendedPrismaEvent;
