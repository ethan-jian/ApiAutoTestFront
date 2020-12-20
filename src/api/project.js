import {postRequest} from "./common";

export const addProjectInfo = function (user_id, name, variables, headers, environment, func_file) {
    return postRequest('api/add/project/', {
        user_id: user_id,
        name: name,
        variables: variables,
        headers: headers,
        environment: environment,
        func_file: func_file
    })
};