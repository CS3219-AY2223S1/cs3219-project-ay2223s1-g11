const axios = require("axios");

let USER_SERVICE_ENDPOINT = ''

if (process.env.REACT_APP_NODE_ENV === "production") {
    USER_SERVICE_ENDPOINT = process.env.REACT_APP_USER_SERVICE_CLOUD_ENDPOINT;
} else {
    USER_SERVICE_ENDPOINT = process.env.REACT_APP_USER_SERVICE_LOCAL_ENDPOINT;
}

export async function createUser(data) {
    const res = await axios.post(USER_SERVICE_ENDPOINT + `/`, data);
    return res;
}

export async function loginUser(data) {
    const res = await axios.post(USER_SERVICE_ENDPOINT + `/login`, data);
    return res;
}

export async function logoutUser(data, jwt) {
    const headers = {
        Authorization: jwt,
    };

    const res = await axios.post(USER_SERVICE_ENDPOINT + `/logout`, data, { headers: headers });
    return res;
}

export async function changePassword(data) {
    const res = await axios.post(USER_SERVICE_ENDPOINT + `/change`, data);
    return res;
}

export async function deleteUser(data, jwt) {
    const headers = {
        Authorization: jwt,
    };

    const res = await axios.post(USER_SERVICE_ENDPOINT + `/delete`, data, { headers: headers });
    return res;
}
