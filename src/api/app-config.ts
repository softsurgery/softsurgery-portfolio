import { axios } from "./axios";
import { AppConfig } from "./types";

const get = async (key: string): Promise<AppConfig> => {
  const response = await axios.get<AppConfig>(
    `./php/routes/app-config.php?key=${key}`
  );
  return response.data;
};

const set = async (key: string, value: string): Promise<AppConfig> => {
  const response = await axios.post<AppConfig>(`./php/routes/app-config.php`, {
    key,
    value,
  });
  return response.data;
};

export const appConfig = { get, set };
