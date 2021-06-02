import { location, user } from "@prisma/client";

export type LocationDelete = {
  user: user,
  location: location
};