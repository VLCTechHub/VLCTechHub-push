const { expect } = require("chai")
const sinon = require("sinon")

const notificationsController = require("../../controllers/notifications")
const remoteApi = require("../../services/remoteApi")
const pushNotificationsHelper = require("../../services/pushNotifications")
const User = require("../../models/User")

describe("Test send reminders functions", () => {
    let remoteApiStub
    let userStub
    let pushSpy
    before(() => {
        remoteApiStub = sinon
            .stub(remoteApi, "fetchLatestItemForType")
            .resolves({ id: "123", title: "Latest job offer", company: { name: "Apple" } })
        userStub = sinon.stub(User, "getUsersByType").resolves([{ token: "abc" }, { token: "def" }])
        pushSpy = sinon.spy(pushNotificationsHelper, "sendNotifications")
    })
    after(() => {
        remoteApiStub.restore()
        userStub.restore()
        pushSpy.restore()
    })
    afterEach(() => {
        pushSpy.resetHistory()
    })
    it("should test the notifications for jobs", done => {
        notificationsController.sendPushNotificationsForType("jobs")
        setTimeout(function() {
            expect(pushSpy.called).to.eq(true)
            expect(pushSpy.firstCall.args[0]).to.eql(["abc", "def"])
            expect(pushSpy.firstCall.args[1].title).to.eql("Hay una nueva oferta de trabajo")
            expect(pushSpy.firstCall.args[1].message).to.eql("Latest job offer en Apple")
            done()
        }, 100)
    })
    it("should test the notifications for events", done => {
        remoteApiStub.resolves({ id: "123", title: "ValenciaJS" })
        notificationsController.sendPushNotificationsForType("events")
        setTimeout(function() {
            expect(pushSpy.called).to.eq(true)
            expect(pushSpy.firstCall.args[0]).to.eql(["abc", "def"])
            expect(pushSpy.firstCall.args[1].title).to.eql("Hay un nuevo evento")
            expect(pushSpy.firstCall.args[1].message).to.eql("ValenciaJS")
            done()
        }, 100)
    })
})
