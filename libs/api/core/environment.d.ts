declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: string;
      PORT: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
}

export {};
