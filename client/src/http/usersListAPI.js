import {$authHost} from "./index";

export const fetchUsers = async () => {
  const {data} = await $authHost.get('api/user/getAll')
  return data;
}

export const toggleUser = async (id) => {
  const {data} = await $authHost.patch(`api/user/toggleUser/${id}`)
  return data;
}
