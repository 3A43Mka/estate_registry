import {$authHost, $host} from "./index";

export const addIssuer = async (fullname, dob, unique_number, taxpayer_number, document, contacts, region,
                                district, settlement, street, building) => {
  const {data} = await $authHost.post('api/issuer/', {
    fullname, dob, unique_number, taxpayer_number, document, contacts, region,
    district, settlement, street, building
  });
  return data;
}

export const getIssuers = async () => {
  const {data} = await $authHost.get('api/issuer/');
  return data;
}