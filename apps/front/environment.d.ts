declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      LIVEKIT_SERVER_URL: string;
    }
  }
}

export {};
