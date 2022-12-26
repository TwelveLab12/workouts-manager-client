/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_STRAPI_BEARER_TOKEN: string
  readonly VITE_STRAPI_PROTOCOL: string
  readonly VITE_STRAPI_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
