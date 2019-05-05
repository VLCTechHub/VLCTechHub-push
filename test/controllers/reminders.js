const { expect } = require("chai")
const sinon = require("sinon")

const remindersController = require("../../controllers/reminders")
const remoteApi = require("../../services/remoteApi")
const pushNotificationsHelper = require("../../services/pushNotifications")
const User = require("../../models/User")

describe("Test send reminders functions", () => {
    let remoteApiStub
    let userStub
    let pushSpy
    before(() => {
        remoteApiStub = sinon
            .stub(remoteApi, "fetchEventsByDate")
            .resolves([
                { date: "2019-05-03T16:00:00Z", title: "test-1" },
                { date: "2019-05-03T16:00:00Z", title: "test-2" },
                { date: "2019-06-03T16:00:00Z", title: "test-3" },
            ])

        userStub = sinon.stub(User, "getUsersByEventId").resolves([{ token: "abc" }, { token: "def" }])
        pushSpy = sinon.spy(pushNotificationsHelper, "sendNotifications")
    })
    after(() => {
        remoteApiStub.restore()
        userStub.restore()
    })
    it("should test the reminders for events date function", done => {
        remindersController.sendRemindersForEventsOnDate("2019-05-03")
        setTimeout(function() {
            expect(pushSpy.called).to.eq(true)
            expect(pushSpy.firstCall.args[0]).to.eql(["abc", "def"])
            expect(pushSpy.secondCall.args[1].message).to.eql("test-2")
            done()
        }, 100)
    })
})
