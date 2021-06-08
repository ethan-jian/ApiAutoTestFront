import {postRequest} from "./common";

export const addCaseSetInfo = function (data) {
    return postRequest('AddCaseSet', data)
};

export const listCaseSetInfo = function (data) {
    return postRequest('ListCaseSet', data)
};

// export const listProjectModuleInfo = function (data) {
//     return postRequest('ProjectModule', data)
// };

export const catCaseSetDetailInfo = function (data) {
    return postRequest('DetailCaseSet', data)
};

export const editCaseSetInfo = function (data) {
    return postRequest('EditCaseSet', data)
};

export const deleteCaseSetInfo = function (data) {
    return postRequest('DeleteCaseSet', data)
};


