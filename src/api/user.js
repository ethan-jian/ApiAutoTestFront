import {deleteRequest, getRequest, postRequest} from "@/api/common";

export const login = function (username, password) {
  return postRequest('user/login/', {
      username: username,
      password:password,
  })
};

export const register = function (username, password) {
  return postRequest('user/register/', {
      username: username,
      password:password,
  })
};

export const logout = function () {
  return deleteRequest('user/logout')
};


export const getLoginUserInfo = function () {
  return getRequest('user/info')
};

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }
//
// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }
//
// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
