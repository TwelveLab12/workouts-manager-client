import { DateTimeAttribute } from '../types/types'

export interface StrapiResponse {
    data: {
        data: [
            DataResponse
        ],
        meta: MetaResponse,
        status: number,
        statusText: string,
        headers: HeaderResponse,
        config: {
            [key: string]: any
        },
        request: any
    }
}

export interface HeaderResponse {
    "content-length": string,
    "content-type": string
}

export interface DataResponse {
    id: number,
    attributes: any
}

export interface ExerciseDataResponse extends DataResponse {
    id: number,
    attributes: StrapiExerciseResponse
}

export interface MetaResponse {
    pagination?: PaginationResponse
}

export interface PaginationResponse {
    page: number,
    pageSize: number,
    pageCount: number,
    total: number
}

export interface StrapiExerciseResponse {
    label: string,
    description: string | null,
    counter: number,
    createdAt: DateTimeAttribute,
    updatedAt: DateTimeAttribute,
    publishedAt: DateTimeAttribute
}

export interface ErrorResponse { error: ErrorContentResponse }
export interface ErrorContentResponse { type: string, error?: any, message?: string } 
