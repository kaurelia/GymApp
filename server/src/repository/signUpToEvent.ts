import { database } from "~root/app";

const signUpToEvent = async (userId: number, eventId: number) => {
  await database.userEvent.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      event: {
        connect: {
          id: eventId,
        },
      },
    },
  });
};
export default signUpToEvent;
