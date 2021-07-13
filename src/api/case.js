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

export const addCaseStepInfo = function (data) {
    return postRequest('AddCaseStep', data)
};

export const listCaseStepInfo = function (data) {
    return postRequest('ListCaseStep', data)
};

export const deleteCaseStepInfo = function (data) {
    return postRequest('DeleteCaseStep', data)
};

export const catCaseStepDetailInfo = function (data) {
    return postRequest('DetailCaseStep', data)
};

export const editCaseStepInfo = function (data) {
    return postRequest('EditCaseStep', data)
};

export const bulkEditCaseStep = function (data) {
    return postRequest('BulkEditCaseStep', data)
};
