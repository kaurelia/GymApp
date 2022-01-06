import { Event as PrismaEvent } from "@prisma/client";

type ExtendedPrismaEvent = Omit<PrismaEvent, "id"> & { participantId: number };
export default ExtendedPrismaEvent;
