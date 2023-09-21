declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_TRANSLOADIT_API_KEY: string;
      NEXT_PUBLIC_TRANSLOADIT_BANNERS_TEMPLATE_ID: string;
      NEXT_PUBLIC_TRANSLOADIT_PROFILES_TEMPLATE_ID: string;
    }
  }
}

export {};
