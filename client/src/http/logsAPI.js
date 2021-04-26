import {$authHost, $host} from "./index";

export const fetchLogs = async (page) => {
  const {data} = await $authHost.get(`api/history/?page=${page}`);
  return data;
}

export const getRequestLogs = async (id) => {
  const {data} = await $host.get(`api/history/getRequestLogs/${id}`);
  return data;
}

export const getRecordLogs = async (id) => {
  const {data} = await $host.get(`api/history/getRecordLogs/${id}`);
  return data;
}