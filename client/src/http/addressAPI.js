import {$authHost, $host} from "./index";

export const getFullAddress = async (id) => {
  const {data} = await $host.get('api/address/getFullAddress/'+id);
  return data;
}
