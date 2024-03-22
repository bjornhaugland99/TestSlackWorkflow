const Axios = require("axios")
const core = require("@actions/core")

const slackMemberIds = [
    "U04NKMM86M7", //Bjørn
    "UF500UCBF", //Marina
]
const today = new Date()
let slackWebHook = core.getInput("slackWebHook")
Date.prototype.getWeek = function () {
    let onejan = new Date(this.getUTCFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getUTCDay() + 1) / 7);
}
Array.prototype.findRandom = function (filterFunction) {
    const filtered = this.filter(filterFunction)
    return filtered[filtered.length * Math.random() | 0]
}
function postSecretsCheckReminder() {
    const today = new Date();
    const memberLength = slackMemberIds.length;
    const index = today.getWeek() % memberLength;

    if (today.getDate() === 1) {
        const apiBodyPayload = `{"person": "${slackMemberIds[index]}"}`;
        Axios.post(slackWebHook, apiBodyPayload)
            .catch(err => {
                console.error(err);
                core.setFailed(err);
            });
    }
}
postSecretsCheckReminder();