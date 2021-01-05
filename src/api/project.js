import {postRequest} from "./common";

export const addProjectInfo = function (data) {
    return postRequest('add/project/', data)
};

export const listProjectInfo = function (data) {
    return postRequest('list/project/', data)
};

export const catProjectDetailInfo = function (data) {
    return postRequest('detail/project/', data)
};

export const editProjectInfo = function (data) {
    return postRequest('edit/project/', data)
};

export const deleteProjectInfo = function (data) {
    return postRequest('delete/project/', data)
};



