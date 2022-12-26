import { ErrorResponse, StrapiResponse } from "./strapi.types";

export const isStrapiResponse = (response: any): response is StrapiResponse => {
    return typeof response === 'object' && response !== null &&
        response.hasOwnProperty('data')
}

export const isErrorResponse = (response: any): response is ErrorResponse => {
    return typeof response === 'object' && response !== null &&
        response.hasOwnProperty('error')
}