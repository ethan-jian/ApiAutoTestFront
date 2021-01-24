import {postRequest} from "./common";

export const addModuleInfo = function (data) {
    return postRequest('AddModule', data)
};

export const listModuleInfo = function (data) {
    return postRequest('ListModule', data)
};

export const catModuleDetailInfo = function (data) {
    return postRequest('DetailModule', data)
};

export const editModuleInfo = function (data) {
    return postRequest('EditModule', data)
};

export const deleteModuleInfo = function (data) {
    return postRequest('DeleteModule', data)
};



