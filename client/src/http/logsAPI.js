import {$authHost} from "./index";

export const fetchLogs = async (page) => {
  const {data} = await $authHost.get(`api/history/?page=${page}`);
  return data;
}
