import {$authHost} from "./index";

 // name, type, cadastral_number, registration_number, document_number, region,
 // district, settlement, street, building

export const addEstate = async (name, type, cadastral_number, registration_number, document_number, region,
                                district, settlement, street, building) => {
  const {data} = await $authHost.post('api/estate/', {
    name, type, cadastral_number, registration_number, document_number, region,
    district, settlement, street, building
  });
  return data;
}

export const getEstates = async () => {
  const {data} = await $authHost.get('api/estate/');
  return data;
}