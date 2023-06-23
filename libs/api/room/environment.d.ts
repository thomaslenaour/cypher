declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LIVEKIT_API_KEY: string;
      LIVEKIT_API_SECRET: string;
    }
  }
}

export {};
