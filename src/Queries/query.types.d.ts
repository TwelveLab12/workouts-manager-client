import { DataResponse, ErrorContentResponse, ErrorResponse, WorkoutDataResponse } from "../api/strapi.types";

export type FetchProps = [DataResponse] | ErrorContentResponse
export type StoreProps = WorkoutDataResponse | DataResponse | ErrorResponse
