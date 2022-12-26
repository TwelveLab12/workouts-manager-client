import { strapiFetch, strapiPost, strapiPut } from "../api/api";
import { strapiApiRoutes } from "../api/routes";
import { DataResponse, ErrorResponse, WorkoutDataResponse } from "../api/strapi.types";
import { WorkoutProps } from "../types/types";
import { FetchProps } from "./query.types";

const { workout } = strapiApiRoutes

export const fetchWorkouts = async (): Promise<FetchProps> => {
  return await strapiFetch(workout)
}

export const fetchWorkout = async (id: number): Promise<WorkoutDataResponse> => {
  return await strapiFetch(`${workout}/${id}`)
}

export const createWorkout = async (data: Record<string, unknown>): Promise<WorkoutDataResponse> => {
  return await strapiPost(workout, data)
}

export const updateWorkout = async (
  id: number,
  data: WorkoutProps,
): Promise<[DataResponse] | ErrorResponse> => {
  const url = `${workout}/${id}`
  return await strapiPut(url, { ...data })
}
