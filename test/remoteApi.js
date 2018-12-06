const { expect } = require("chai");
const remoteApi = require("../services/remoteApi");
const sinon = require("sinon");

const jsonAsc = {
  events: [
    {
      id: "18afb4fd-eec8-42cc-906f-2cddca43396e",
      date: "2018-11-27T07:00:00Z"
    },
    {
      id: "76e6d805-dbd7-43c4-ab27-9906afec2f0e",
      date: "2018-11-27T16:30:00Z"
    },
    {
      id: "b5a43a9b-d064-4980-8b71-847c6c3b2ac1",
      date: "2018-12-20T18:00:00Z"
    }
  ]
};

const jsonDesc = {
  jobs: [
    {
      id: "b5a43a9b-d064-4980-8b71-847c6c3b2ac1",
      published_at: "2018-12-20T18:00:00Z"
    },
    {
      id: "76e6d805-dbd7-43c4-ab27-9906afec2f0e",
      published_at: "2018-11-27T16:30:00Z"
    },
    {
      id: "18afb4fd-eec8-42cc-906f-2cddca43396e",
      published_at: "2018-11-27T07:00:00Z"
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
    const latestItemId = remoteApi.getLatestItem("date", jsonAsc.events);
    expect(latestItemId.id).to.equal("b5a43a9b-d064-4980-8b71-847c6c3b2ac1");
  });
  it("should return latest item in a set when sort order is descending", () => {
    const latestItemId = remoteApi.getLatestItem("published_at", jsonDesc.jobs);
    expect(latestItemId.id).to.equal("b5a43a9b-d064-4980-8b71-847c6c3b2ac1");
  });
});

describe("test getLatestItemForType function", () => {
  const fetch = sinon.stub().resolves(jsonDesc);
  it("should return latest event ID", done => {
    remoteApi.getLatestItemForType("jobs", fetch).then(res => {
      expect(res.id).to.equal("b5a43a9b-d064-4980-8b71-847c6c3b2ac1");
      done();
    });
  });
});
