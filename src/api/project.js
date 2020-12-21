import {postRequest} from "./common";

export const addProjectInfo = function (data) {
    return postRequest('add/project/', data)
};