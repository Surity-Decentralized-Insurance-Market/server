declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      FRONTEND_URL: "http://127.0.01:5173";
      PORT?: number;
    }
  }
}

export {};
