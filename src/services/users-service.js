import { clientUsers } from './clients';
const idApp = 100;
const obj = {};

export const doLogin = async ({ wiw, password }) => {
  const credentials = btoa(`${wiw}:${password}:${idApp}`);
  return await clientUsers.post('/User/DoLogin', obj, {
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });
};
export const getADUsers = async () => {
  return await clientUsers.get('/User/GetADUsers', {
    params: {
      idApp,
    },
  });
};
export const getUser = async (wiw) => {
  return await clientUsers.post('/User/CheckUser', {
    WIW: wiw,
    idApp: idApp,
  });
};
export const insertOrUpdateUserAccess = async ({ wiw, custom, idRol }) => {
  return await clientUsers.post('/User/InsertUserAccess', {
    Id_Employee: wiw,
    Id_App: idApp,
    ID_Role: parseInt(idRol),
    Custom: custom ?? '',
    Last_login: new Date(),
    Id: 0,
  });
};
export const getRoles = async () => await clientUsers.get('/User/GetRoles');
