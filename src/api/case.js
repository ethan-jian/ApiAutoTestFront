import {postRequest} from "./common";

export const addCaseInfo = function (data) {
    return postRequest('AddCase', data)
};

export const listCaseInfo = function (data) {
    return postRequest('ListCase', data)
};

// export const listProjectModuleInfo = function (data) {
//     return postRequest('ProjectModule', data)
// };

export const catCaseDetailInfo = function (data) {
    return postRequest('DetailCase', data)
};

export const editCaseInfo = function (data) {
    return postRequest('EditCase', data)
};

export const deleteCaseInfo = function (data) {
    return postRequest('DeleteCase', data)
};

export const AddCaseStepInfo = function (data) {
    return postRequest('AddCaseStep', data)
};

