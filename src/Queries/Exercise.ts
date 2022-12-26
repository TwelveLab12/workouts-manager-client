import queryString from "query-string";

import { strapiDelete, strapiFetch, strapiPost, strapiPut } from "../api/api";
import { strapiApiRoutes } from "../api/routes";
import type { DataResponse, ErrorResponse } from "../api/strapi.types";
import type { DuplicatedExerciseProps, ExerciseProps, InitialExerciseProps } from "../types/types";
import type { FetchProps, StoreProps } from "./query.types";

const { exercise } = strapiApiRoutes

const populateExerciseUrl = (): string => {
  return buildExerciseUrl({ populate: '*' })
}

const buildExerciseUrl = (parameters: Record<string, string> | undefined = undefined): string => {
  if (!parameters) {
    return `${exercise}`
  }
  return `${exercise}?${queryString.stringify(
    parameters
  )}`
}

export const fetchAllExercises = async (): Promise<FetchProps> => {
  return await strapiFetch(populateExerciseUrl())
}

export const fetchExercisesByWorkout = async (workoutId: number): Promise<FetchProps> => {
  return await strapiFetch(buildExerciseUrl({
    populate: '*',
    'filters[workout][id][$eq]': String(workoutId)
  }))
}

export const createExercise = async (data: ExerciseProps | InitialExerciseProps | DuplicatedExerciseProps): Promise<StoreProps> => {
  const formatRelationships: { exercise_library: number | null } = { exercise_library: null }
  if (data?.libraryExercise?.id) {
    formatRelationships.exercise_library = data.libraryExercise.id
  }
  return await strapiPost(populateExerciseUrl(), { ...data, ...formatRelationships })
}

export const updateExercise = async (
  id: number,
  data: ExerciseProps,
): Promise<[DataResponse] | ErrorResponse> => {

  const formatRelationships: { exercise_library: number | null } = { exercise_library: null }
  if (data?.libraryExercise?.id) {
    formatRelationships.exercise_library = data.libraryExercise.id
  }
  const url = `${exercise}/${id}`
  return await strapiPut(url, { ...data, ...formatRelationships })
}

export const deleteExercise = async (
  id: number
): Promise<[DataResponse] | ErrorResponse> => {
  const url = `${exercise}/${id}`
  return await strapiDelete(url)
}
