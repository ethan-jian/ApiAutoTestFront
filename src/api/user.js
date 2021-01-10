import {deleteRequest, getRequest, postRequest} from "@/api/common";

export const login = function (username, password) {
    return postRequest('UserLogin', {
        username: username,
        password: password,
    })
};

export const register = function (username, password) {
    return postRequest('UserRegister', {
        username: username,
        password: password,
    })
};

export const logout = function () {
    return deleteRequest('UserLogout')
};


export const getLoginUserInfo = function () {
    return getRequest('LoginUserInfo')
};

export const getUserInfo = function () {
    return getRequest('UserInfo')
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
