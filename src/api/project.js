import {postRequest} from "./common";

export const addProjectInfo = function (data) {
    return postRequest('AddProject', data)
};

export const listProjectInfo = function (data) {
    return postRequest('ListProject', data)
};

export const catProjectDetailInfo = function (data) {
    return postRequest('DetailProject', data)
};

export const editProjectInfo = function (data) {
    return postRequest('EditProject', data)
};

export const deleteProjectInfo = function (data) {
    return postRequest('DeleteProject', data)
};

export const catProjectModuleInfo = function (data) {
    return postRequest('ProjectModule', data)
};

export const projectCaseSetInfo = function (data) {
    return postRequest('ProjectCaseSet', data)
};

