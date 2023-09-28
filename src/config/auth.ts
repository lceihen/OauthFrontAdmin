import { inMicroEnv } from "@/utils";

export const adminAuthConfig = {
  prodUrl: "https://admin.abclive.cloud/auth/callback",
  authUrl: "https://auth.abclive.cloud/",
  secret: "553d4e01120fe403",
  clientId: "553d4e01120fe403",
};

export const microAuthConfig = {
  prodUrl: "https://micro.abclive.cloud/auth/callback",
  authUrl: "https://auth.abclive.cloud/",
  secret: "4330e47a00b259f8",
  clientId: "033f0a50eb2cd2b1",
};

export const authConfig = inMicroEnv ? microAuthConfig : adminAuthConfig;
