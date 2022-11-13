declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      GUILD_ID:  string;
      MONGO_URI: string;
    }
  }
}

export {};
