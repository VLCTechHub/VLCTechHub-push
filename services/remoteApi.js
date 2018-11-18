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

const getLatestItem = items => {
  items.sort((a, b) => new Date(a.date) < new Date(b.date));
  return items[0];
};

const getLatestItemForType = (type, fetch = fetchData) => {
  return new Promise((res, rej) => {
    fetch(remoteApiCalls[type].uri).then(json =>
      res(getLatestItem(json[remoteApiCalls[type].responseObject]))
    );
  });
};

module.exports = {
  fetchData,
  getLatestItem,
  getLatestItemForType
};
