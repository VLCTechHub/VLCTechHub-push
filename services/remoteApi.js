const fetch = require("node-fetch");
const API_URI = "https://api.vlctechhub.org/v1";

const remoteApiCalls = {
  events: {
    uri: "/events?category=next",
    responseObject: "events"
  },
  jobs: {
    uri: "/jobs",
    responseObject: "jobs"
  }
};

const fetchData = function(uri) {
  return new Promise((resolve, reject) => {
    fetch(`${API_URI}/${uri}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    }).then(response => resolve(response.json()), err => reject(err));
  });
};

const getLatestItem = (field, items) => {
  items.sort((a, b) => {
    const dateA = new Date(a[field]);
    const dateB = new Date(b[field]);
    if (dateA < dateB) return 1;
    if (dateA > dateB) return -1;
    return 0;
  });
  return items[0];
};

const getLatestItemForType = (type, fetch = fetchData) => {
  return new Promise((res, rej) => {
    fetch(remoteApiCalls[type].uri).then(json =>
      res(
        getLatestItem(
          type === "jobs" ? "published_at" : "date",
          json[remoteApiCalls[type].responseObject]
        )
      )
    );
  });
};

module.exports = {
  fetchData,
  getLatestItem,
  getLatestItemForType
};
