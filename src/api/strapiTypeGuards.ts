import { AxiosError } from "axios";

import { ErrorResponse, StrapiResponse } from "./strapi.types";

export const isStrapiResponse = (response: unknown): response is StrapiResponse => {
  return typeof response === 'object' && response !== null && Object.prototype.hasOwnProperty.call(response, 'data')
}

export const isErrorResponse = (response: unknown): response is ErrorResponse => {
  if (response instanceof AxiosError) {
    return true
  }
  return typeof response === 'object' && response !== null && (Object.prototype.hasOwnProperty.call(response, 'error'))
}
