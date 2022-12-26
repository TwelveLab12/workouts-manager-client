import { AxiosError, AxiosHeaders } from "axios";

import { DateTimeAttribute } from "../types/types";

export interface StrapiResponse {
  data: {
    data: [DataResponse]
    meta: MetaResponse
    status: number
    statusText: string
    headers: AxiosHeaders
    config: Record<string, unknown>
    request: XMLHttpRequest
  }
}

export interface HeaderResponse {
  'content-length': string
  'content-type': string
}

export interface DataResponse {
  id: number
  attributes: unknown
}

export interface ExerciseDataResponse extends DataResponse {
  id: number
  attributes: StrapiExerciseAttributesResponse
}

export interface LibraryExerciseDataResponse extends DataResponse {
  id: number
  attributes: StrapiLibraryExerciseAttributesResponse
}

export interface WorkoutDataResponse extends DataResponse {
  id: number
  attributes: StrapiWorkoutAttributesResponse
}

export interface MetaResponse {
  pagination?: PaginationResponse
}

export interface PaginationResponse {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface StrapiWorkoutAttributesResponse {
  label: string
  description: string | null
  createdAt: DateTimeAttribute
  updatedAt: DateTimeAttribute
}

export interface StrapiLibraryExerciseAttributesResponse {
  label: string
  description: string | null
  createdAt: DateTimeAttribute
  updatedAt: DateTimeAttribute
}

export interface StrapiExerciseAttributesResponse {
  label: string
  description: string | null
  counter: number
  repetition: number
  weight: number
  rest: number
  createdAt: DateTimeAttribute
  updatedAt: DateTimeAttribute
  publishedAt: DateTimeAttribute
  workout?: { data: WorkoutDataResponse }
  exercise_library?: { data: LibraryExerciseDataResponse }
}

export interface ErrorResponse {
  error: ErrorContentResponse
}
export interface ErrorContentResponse {
  type: string
  error?: AxiosError<unknown, unknown> | undefined | unknown
  message?: string
}

export type StrapiQueryOutput = [DataResponse] | ErrorResponse | AxiosResponse<unknown, unknown>
export type StrapiQueryPromiseOutput = Promise<StrapiQueryOutput>
