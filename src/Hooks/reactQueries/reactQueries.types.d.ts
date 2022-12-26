import { StrapiQueryOutput } from '../../api/strapi.types'

interface StrapiReactQueryResponse {
  data: StrapiQueryOutput
  error: unknown
  isSuccess: boolean
}
