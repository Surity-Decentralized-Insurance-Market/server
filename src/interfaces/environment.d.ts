declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      FRONTEND_URL: string;
      PORT?: number;
      MONGODB_URI: string;
      SERVER_TRON_PRIVATE_KEY: string;
    }
  }
}

export {};
