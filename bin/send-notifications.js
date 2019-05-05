#!/usr/bin/env node

const bootstrap = require("./bootstrap")
const notificationsController = require("../controllers/notifications")

bootstrap.connectToMongo(() => {
    notificationsController.sendPushNotificationsForType("events")
    notificationsController.sendPushNotificationsForType("jobs")
})
