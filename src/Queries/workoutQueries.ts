import { strapiDelete, strapiFetch, strapiPost, strapiPut } from "../api/api";
import { strapiApiRoutes } from "../api/routes";
import type { DataResponse, ErrorResponse, StrapiResponse, WorkoutDataResponse } from "../api/strapi.types";
import type { FavoriteWorkoutProps, WorkoutProps } from "../types/types";
import type { FetchProps } from "./query.types";

const { workout } = strapiApiRoutes

export const fetchWorkouts = async (): Promise<FetchProps> => {
  return await strapiFetch(workout)
}

export const fetchWorkout = async (id: number): Promise<WorkoutDataResponse> => {
  return await strapiFetch(`${workout}/${id}`)
}

export const postWorkout = async (data: Record<string, unknown>): Promise<WorkoutDataResponse> => {
  return await strapiPost(workout, data)
}

export const putWorkout = async (
  id: number,
  data: WorkoutProps | FavoriteWorkoutProps,
): Promise<[DataResponse] | ErrorResponse> => {
  const url = `${workout}/${id}`
  return await strapiPut(url, { ...data })
}

export const deleteWorkout = async (id: number): Promise<StrapiResponse | ErrorResponse> => {
  const url = `${workout}/${id}`
  return await strapiDelete(url)
}