const { expect } = require("chai")
const User = require("../../models/User")
const sinon = require("sinon")
require("sinon-mongoose")

const user1 = {
    token: "123",
    type: "events",
    latestItemId: "abc",
}
const user2 = {
    token: "456",
    type: "events",
    latestItemId: "def",
}
const user3 = {
    token: "789",
    type: "reminders",
    eventId: "ghi",
}
const user4 = {
    token: "012",
    type: "reminders",
    eventId: "ghi",
}

describe("User Model", () => {
    let UserMock
    before(() => {
        UserMock = sinon.mock(User)
    })
    after(() => {
        UserMock.restore()
    })
    it("should return a user by type and token", done => {
        UserMock.expects("findOne")
            .withArgs({ type: "events", token: "123" })
            .chain("exec")
            .resolves(user1)
        User.getUserByTypeAndToken("events", "123").then(res => {
            expect(res.token).to.eq("123")
            done()
        })
    })
    it("should return the users of type that don't match latest item id", done => {
        UserMock.expects("find")
            .withArgs({ type: "events", latestItemId: { $ne: "def" } })
            .chain("exec")
            .resolves([user1])
        User.getUsersByType("events", "def").then(res => {
            expect(res.length).to.eq(1)
            expect(res[0].latestItemId).to.eq("abc")
            done()
        })
    })
    it("should return users for a specific event ID", done => {
        UserMock.expects("find")
            .withArgs({ eventId: "ghi" })
            .chain("exec")
            .resolves([user3, user4])
        User.getUsersByEventId("ghi").then(res => {
            expect(res.length).to.eq(2)
            expect(res[0].eventId).to.eq("ghi")
            done()
        })
    })
    it("should update a user's latest item id", done => {
        UserMock.expects("update")
            .withArgs({ token: { $in: [789, 012] }, type: "jobs" }, { $set: { latestItemId: "mno" } })
            .chain("exec")
            .resolves({ status: "ok" })
        User.setLatestItemIdForUser([789, 012], "jobs", "mno").then(res => {
            expect(res.status).to.eq("ok")
            done()
        })
    })
    it("should remove a user by type and token", done => {
        UserMock.expects("remove")
            .withArgs({ token: "123", type: "jobs" })
            .chain("exec")
            .resolves({ status: "ok" })
        User.removeUserByTypeAndToken("jobs", "123").then(res => {
            expect(res.status).to.eq("ok")
            done()
        })
    })
    it("should remove a user by type and token and event ID", done => {
        UserMock.expects("remove")
            .withArgs({ token: "123", type: "jobs", eventId: "xyz" })
            .chain("exec")
            .resolves({ status: "ok" })
        User.removeUserByTypeAndTokenAndEventId("jobs", "123", "xyz").then(res => {
            expect(res.status).to.eq("ok")
            done()
        })
    })
})
