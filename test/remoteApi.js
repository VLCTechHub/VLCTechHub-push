const { expect } = require("chai");
const remoteApi = require("../services/remoteApi");
const sinon = require("sinon");

const jsonAsc = {
  events: [
    {
      id: "december",
      date: "2018-12-25T17:00:00Z"
    },
    {
      id: "november",
      date: "2018-11-25T17:00:00Z"
    },
    {
      id: "october",
      date: "2018-10-25T17:00:00Z"
    }
  ]
};

const jsonDesc = {
  events: [
    {
      id: "october",
      date: "2018-10-25T17:00:00Z"
    },
    {
      id: "november",
      date: "2018-11-25T17:00:00Z"
    },
    {
      id: "december",
      date: "2018-12-25T17:00:00Z"
    }
  ]
};

describe("test API calls", () => {
  it("should return valid set of events", done => {
    remoteApi.fetchData("events").then(json => {
      expect(json).to.be.a("object");
      expect(json).to.have.property("events");
      done();
    });
  });
});

it("should return valid set of jobs", done => {
  remoteApi.fetchData("jobs").then(json => {
    expect(json).to.be.a("object");
    expect(json).to.have.property("jobs");
    done();
  });
});

describe("test getLatestItem function", () => {
  it("should return latest item in a set when sort order is ascending", () => {
    const latestItemId = remoteApi.getLatestItem(jsonAsc.events);
    expect(latestItemId.id).to.equal("december");
  });
  it("should return latest item in a set when sort order is descending", () => {
    const latestItemId = remoteApi.getLatestItem(jsonDesc.events);
    expect(latestItemId.id).to.equal("december");
  });
});

describe("test getLatestItemForType function", () => {
  const fetch = sinon.stub().resolves(jsonAsc);
  it("should return latest event ID", done => {
    remoteApi.getLatestItemForType("events", fetch).then(res => {
      expect(res.id).to.equal("december");
      done();
    });
  });
});
