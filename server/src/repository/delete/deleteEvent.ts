import { database } from "~root/app";

const deleteEvent = async (eventId: number) => {
  await database.event.delete({
    where: {
      id: eventId,
    },
  });
};
export default deleteEvent;
