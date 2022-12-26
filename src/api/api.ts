import axios, { isAxiosError } from "axios";
import { ErrorResponse, StrapiResponse, DataResponse, ErrorContentResponse } from "./strapi.types"
import { isStrapiResponse } from "./starpiTypeGuards"

const { VITE_STRAPI_BEARER_TOKEN: token, VITE_STRAPI_PROTOCOL, VITE_STRAPI_URL } = import.meta.env

export const strapiQueryHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
}

export const strapiInstance = axios.create({
  baseURL: `${VITE_STRAPI_PROTOCOL}${VITE_STRAPI_URL}/api`,
  timeout: 1000,
  headers: strapiQueryHeaders
});

const errorTypes: { [key: string]: string } = { axiosError: "Axios Error", genericError: 'Generic Error' }

export const strapiGet = async (url: string): Promise<StrapiResponse | ErrorResponse> => {
  try {
    const response = await strapiInstance.get(url) as StrapiResponse
    return response
  } catch (error) {
    console.error(error)
    if (isAxiosError(error)) {
      return {
        error: {
          type: errorTypes.axiosError,
          error: error,
          message: error.message
        }
      }
    }
    return {
      error: {
        type: errorTypes.genericError,
        error: error
      }
    }
  }
}



export const strapiFetch = async (url: string): Promise<[DataResponse] | ErrorContentResponse> => {
  const fetch = await strapiGet(url)

  if (isStrapiResponse(fetch)) {
    return fetch?.data?.data
  }

  return fetch.error
} 