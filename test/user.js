const { expect } = require("chai");
const User = require("../models/User");
const sinon = require("sinon");
require("sinon-mongoose");

require("../models/User");

const user1 = {
  token: "123",
  type: "events",
  lastItemId: "abc"
};
const user2 = {
  token: "456",
  type: "events",
  lastItemId: "def"
};
const user3 = {
  token: "789",
  type: "jobs",
  lastItemId: "ghi"
};
const user4 = {
  token: "012",
  type: "jobs",
  lastItemId: "jkl"
};

describe("User Model", () => {
  const UserMock = sinon.mock(User);
  it("should return a user by type and token", done => {
    UserMock.expects("findOne")
      .withArgs({ type: "events", token: "123" })
      .chain("exec")
      .resolves(user1);
    User.getUserByTypeAndToken("events", "123").then(res => {
      expect(res.token).to.eq("123");
      done();
    });
  });
  it("should return the users of type that don't match latest item id", done => {
    UserMock.expects("find")
      .withArgs({ type: "events", lastItemId: { $ne: "def" } })
      .chain("exec")
      .resolves([user2]);
    User.getUsersByType("events", "def").then(res => {
      expect(res.length).to.eq(1);
      expect(res[0].lastItemId).to.eq("def");
      done();
    });
  });
  it("should update a user's latest item id", done => {
    UserMock.expects("update")
      .withArgs(
        { token: { $in: [789, 012] }, type: "jobs" },
        { $set: { latestItemId: "mno" } }
      )
      .chain("exec")
      .resolves({ status: "ok" });
    User.setLatestItemIdForUser([789, 012], "jobs", "mno").then(res => {
      expect(res.status).to.eq("ok");
      done();
    });
  });
});
