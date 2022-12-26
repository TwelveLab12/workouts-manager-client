
export const QueryStatuses = {
    ERROR: 'error',
    SUCCESS: 'success',
} as const

export type QueryStatusTypes = typeof QueryStatuses[keyof typeof QueryStatuses]

export interface queryResponseOutput {
    status: QueryStatusTypes
    message: string
    response: unknown
}

export const queryResponse = (
    status: QueryStatusTypes,
    message: string,
    response?: unknown,
): queryResponseOutput => {
    return {
        status,
        message,
        response,
    }
}

export const successResponse = (message: string, response?: unknown): queryResponseOutput => {
    return queryResponse(QueryStatuses.SUCCESS, message, response)
}

export const errorResponse = (message: string, response?: unknown): queryResponseOutput => {
    return queryResponse(QueryStatuses.ERROR, message, response)
}
