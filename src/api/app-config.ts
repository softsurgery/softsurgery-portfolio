import { axios } from "./axios";
import { AppConfig } from "./types";

const get = async (keys: string | string[]): Promise<AppConfig[]> => {
  const queryParam = Array.isArray(keys)
    ? keys.map((key) => `keys[]=${encodeURIComponent(key)}`).join("&")
    : `key=${encodeURIComponent(keys)}`;

  const response = await axios.get<AppConfig[]>(
    `./php/routes/app-config.php?${queryParam}`
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
