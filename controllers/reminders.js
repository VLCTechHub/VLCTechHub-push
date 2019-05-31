const User = require("../models/User")
const remoteApi = require("../services/remoteApi")
const pushNotificationsHelper = require("../services/pushNotifications")

const sendRemindersForEventsOnDate = date => {
    remoteApi.fetchEventsByDate(date).then(sendRemindersForEvents)
}

const sendRemindersForEvents = events => {
    for (event of events) {
        sendRemindersForEvent(event)
    }
}

const sendRemindersForEvent = event => {
    User.getUsersByEventId(event.id).then(users => {
        const tokens = users.map(user => user.token)
        pushNotificationsHelper.sendNotifications(tokens, {
            title: "Recordatorio para el evento",
            message: event.title,
            data: { type: "reminders", id: event.id },
        })
    })
}

module.exports = {
    sendRemindersForEventsOnDate,
}
