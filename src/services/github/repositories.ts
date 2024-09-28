import { RANDOM_REPOSITORIES } from "@/constants";

export const getRandomRepositoryOfTheDay = () => {
  const today = new Date();
  const day = today.getDate();
  return RANDOM_REPOSITORIES[day % RANDOM_REPOSITORIES.length];
};
