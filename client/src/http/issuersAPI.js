import {$authHost, $host} from "./index";

export const addIssuer = async (fullname, dob, unique_number, taxpayer_number, document, contacts, region,
                                district, settlement, street, building) => {
  const {data} = await $authHost.post('api/issuer/', {
    fullname, dob, unique_number, taxpayer_number, document, contacts, region,
    district, settlement, street, building
  });
  // localStorage.setItem('token', data.token)
  return data;
}
