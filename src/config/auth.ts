import { inMicroEnv, isBeta, isLocal } from "@/utils";

export const adminAuthConfig = {
  local: {
    prodUrl: "http://localhost:5175/auth/callback",
    authUrl: "http://localhost:3001",
    secret: "553d4e01120fe403",
    clientId: "553d4e01120fe404",
  },
  beta: {
    prodUrl: "https://admin-beta.abclive.cloud/auth/callback",
    authUrl: "https://auth-beta.abclive.cloud/",
    secret: "553d4e01120fe403",
    clientId: "553d4e01120fe404",
  },
  prod: {
    prodUrl: "https://admin.abclive.cloud/auth/callback",
    authUrl: "https://auth.abclive.cloud/",
    secret: "553d4e01120fe403",
    clientId: "553d4e01120fe403",
  },
};

export const microAuthConfig = {
  local: {
    prodUrl: "http://localhost:5175/auth/callback",
    authUrl: "http://localhost:3001",
    secret: "553d4e01120fe403",
    clientId: "553d4e01120fe404",
  },
  beta: {
    prodUrl: "http://localhost:5175/auth/callback",
    authUrl: "http://localhost:3001",
    secret: "553d4e01120fe403",
    clientId: "553d4e01120fe404",
  },
  prod: {
    prodUrl: "https://micro.abclive.cloud/auth/callback",
    authUrl: "https://auth.abclive.cloud/",
    secret: "4330e47a00b259f8",
    clientId: "033f0a50eb2cd2b1",
  },
};

export const handleGetConfig = () => {
  const config = inMicroEnv ? microAuthConfig : adminAuthConfig;
  console.log(isLocal, isBeta);
  if (isLocal) {
    return config["local"];
  } else if (isBeta) {
    return config["beta"];
  } else {
    return config["prod"];
  }
};

export const authConfig = handleGetConfig();
