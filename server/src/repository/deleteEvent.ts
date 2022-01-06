import { database } from "~root/app";

const deleteEvent = (eventId: number) => {
  database.event.delete({
    where: {
      id: eventId,
    },
  });
};
export default deleteEvent;
