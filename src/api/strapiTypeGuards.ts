import { AxiosError } from "axios";

export const isStrapiResponse = (response: unknown ): boolean => {
  return typeof response === 'object' && response !== null && Object.prototype.hasOwnProperty.call(response, 'data')
}

export const isErrorResponse = (response: unknown): boolean => {
  if (response instanceof AxiosError) {
    return true
  }
  return typeof response === 'object' && response !== null && (Object.prototype.hasOwnProperty.call(response, 'error'))
}
