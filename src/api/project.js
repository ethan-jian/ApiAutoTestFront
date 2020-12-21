import {getRequest, postRequest} from "./common";

export const addProjectInfo = function (data) {
    return postRequest('add/project/', data)
};

export const listProjectInfo = function () {
    return getRequest('list/project')
};