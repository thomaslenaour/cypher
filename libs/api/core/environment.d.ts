declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: string;
      PORT: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
      LIVEKIT_API_KEY: string;
      LIVEKIT_API_SECRET: string;
    }
  }
}

export {};
