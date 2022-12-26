/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_STRAPI_BEARER_TOKEN: string
    readonly VITE_STRAPI_PROTOCOL: string
    readonly VITE_STRAPI_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
