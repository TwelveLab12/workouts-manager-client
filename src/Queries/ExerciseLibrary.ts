import { strapiFetch } from "../api/api";
import { strapiApiRoutes } from "../api/routes";
import { FetchProps } from "./query.types";

const { exerciseLibrary } = strapiApiRoutes

export const fetchLibraryExercises = async (): Promise<FetchProps> => {
  return await strapiFetch(exerciseLibrary)
}
