/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

type OnLineModeType = "0" | "1"

interface ImportMetaEnv {
  readonly VITE_STRAPI_BEARER_TOKEN: string
  readonly VITE_STRAPI_PROTOCOL: string
  readonly VITE_STRAPI_URL: string
  readonly VITE_IS_ONLINE_MODE: OnLineModeType
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
