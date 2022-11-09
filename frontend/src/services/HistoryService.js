const axios = require("axios");

let HISTORY_SERVICE_ENDPOINT = ''

if (process.env.REACT_APP_NODE_ENV === "production") {
    HISTORY_SERVICE_ENDPOINT = process.env.REACT_APP_HISTORY_SERVICE_CLOUD_ENDPOINT;
} else {
    HISTORY_SERVICE_ENDPOINT = process.env.REACT_APP_HISTORY_SERVICE_LOCAL_ENDPOINT;
}

export async function addQuestionToHistory(user, question) {
    const res = await axios.post(HISTORY_SERVICE_ENDPOINT + `/${user}`, question);
    return res;
}

export async function getUserQuestionHistory(user) {
    const res = await axios.get(HISTORY_SERVICE_ENDPOINT + `/${user}`);
    return res.data.questionHistory;
}
