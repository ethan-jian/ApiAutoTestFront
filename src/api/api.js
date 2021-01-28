import {postRequest} from "./common";

export const addApiInfo = function (data) {
    return postRequest('AddApi', data)
};

export const listApiInfo = function (data) {
    return postRequest('ListApi', data)
};

export const catApiDetailInfo = function (data) {
    return postRequest('DetailApi', data)
};

export const editApiInfo = function (data) {
    return postRequest('EditApi', data)
};

export const deleteApiInfo = function (data) {
    return postRequest('DeleteApi', data)
};



