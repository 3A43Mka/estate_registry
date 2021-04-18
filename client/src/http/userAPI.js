import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (fullname, dob,
                                   passport_series, passport_id, passport_date,
                                   passport_authority, taxpayer_number, email,
                                   password) => {
  const {data} = await $host.post('api/user/register', {
    fullname,
    dob,
    passport_series,
    passport_id,
    passport_date,
    passport_authority,
    taxpayer_number,
    email,
    password
  })
  // localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const login = async (email, password) => {
  const {data} = await $host.post('api/user/login', {email, password})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const check = async () => {
  const {data} = await $authHost.get('api/user/auth')
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}
