const User = require("../models/User")
const remoteApi = require("../services/remoteApi")
const pushNotificationsHelper = require("../services/pushNotifications")

const notificationTitles = {
    events: "Hay un nuevo evento",
    jobs: "Hay una nueva oferta de trabajo",
}

const sendPushNotificationsForType = type =>
    remoteApi
        .fetchLatestItemForType(type)
        .then(latestItem => sendPushNotificationsForLatestItem(type, latestItem))

const sendPushNotificationsForLatestItem = (type, latestItem) =>
    User.getUsersByType(type, latestItem.id).then(users =>
        sendPushNotificationsToUsers(type, latestItem, users),
    )

const sendPushNotificationsToUsers = (type, latestItem, users) => {
    const tokens = users.map(user => user.token)
    pushNotificationsHelper.sendNotifications(tokens, {
        title: notificationTitles[type],
        message: type === "events" ? latestItem.title : `${latestItem.title} en ${latestItem.company.name}`,
        data: { type, id: latestItem.id },
    })
    User.setLatestItemIdForUser(tokens, type, latestItem.id).then(res => res)
}

module.exports = {
    sendPushNotificationsForType,
}
