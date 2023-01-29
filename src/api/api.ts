import axios, { isAxiosError } from "axios";

import { StrapiQueryPromiseOutput } from "./strapi.types";
import { isStrapiResponse } from "./strapiTypeGuards";

const { VITE_STRAPI_BEARER_TOKEN: token, VITE_STRAPI_PROTOCOL, VITE_STRAPI_URL } = import.meta.env

export const strapiQueryHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
}

export const strapiInstance = axios.create({
  baseURL: `${VITE_STRAPI_PROTOCOL}${VITE_STRAPI_URL}/api`,
  timeout: 1000,
  headers: strapiQueryHeaders,
})

const errorTypes: Record<string, string> = {
  axiosError: 'Axios Error',
  genericError: 'Generic Error',
}

export const strapiGet = async (url: string): StrapiQueryPromiseOutput => {
  try {
    const response = await strapiInstance.get(url)
    return response
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: {
          type: errorTypes.axiosError,
          error,
          message: error.message,
        },
      }
    }
    return {
      error: {
        type: errorTypes.genericError,
        error,
      },
    }
  }
}

export const strapiFetch = async (url: string): StrapiQueryPromiseOutput => {
  const fetch = await strapiGet(url)

  if (isStrapiResponse(fetch)) {
    return fetch?.data?.data
  }

  return fetch.error
}

export const strapiPost = async (
  url: string,
  data: Record<string, unknown>,
  fetchDataResponse = true,
): StrapiQueryPromiseOutput => {
  try {
    const response = await strapiInstance.post(`${url}`, { data })
    if (!fetchDataResponse) {
      return response
    }
    return response?.data?.data
  } catch (error) {
    console.error(error)
    if (isAxiosError(error)) {
      return {
        error: {
          type: errorTypes.axiosError,
          error,
          message: error.message,
        },
      }
    }
    return {
      error: {
        type: errorTypes.genericError,
        error,
      },
    }
  }
}

export const strapiPut = async (
  url: string,
  data: Record<string, unknown>,
  fetchDataResponse = true,
): StrapiQueryPromiseOutput => {
  try {
    const response = await strapiInstance.put(url, { data })
    if (!fetchDataResponse) {
      return response
    }
    return response?.data?.data
  } catch (error) {
    console.error(error)
    if (isAxiosError(error)) {
      return {
        error: {
          type: errorTypes.axiosError,
          error,
          message: error.message,
        },
      }
    }
    return {
      error: {
        type: errorTypes.genericError,
        error,
      },
    }
  }
}

export const strapiDelete = async (
  url: string,
): StrapiQueryPromiseOutput => {
  return await strapiInstance.delete(url)
} 
