declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_LIVEKIT_SERVER_URL: string;
    }
  }
}

export {};
