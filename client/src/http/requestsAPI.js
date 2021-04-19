import {$authHost, $host} from "./index";

// // parameters for request
// let {type, requisites, ownership_share, issued_at} = req.query;
// // parameters for issuer
// let {fullname, dob, unique_number, taxpayer_number, contacts} = req.query;
// // parameters for estate
// let {name, building_type, cadastral_number, registration_number, document_number} = req.query;

export const searchRequests = async (type, requisites, ownership_share, issued_at,
                                     fullname, dob, unique_number, taxpayer_number, contacts,
                                     name, building_type, cadastral_number, registration_number,
                                     document_number, page) => {
  const {data} = await $host.get('api/request/', {
    params: {
      type: type,
      requisites: requisites,
      ownership_share: ownership_share,
      issued_at: issued_at,
      fullname: fullname,
      dob: dob,
      unique_number: unique_number,
      taxpayer_number: taxpayer_number,
      contacts: contacts,
      name: name,
      building_type: building_type,
      cadastral_number: cadastral_number,
      registration_number: registration_number,
      document_number: document_number,
      page: page
    }
  });
  console.log(data);
  return data;
}

export const addRequest = async (type, requisites, ownership_share, issued_at, issuerId, estateId) => {
  const {data} = await $authHost.post('api/request/', {
    type,
    requisites,
    ownership_share,
    issued_at,
    issuerId,
    estateId
  });
  console.log(data);
  return data;
}

export const getRequest = async (id) => {
  const {data} = await $host.get('api/request/' + id);
  console.log(data);
  return data;
}

