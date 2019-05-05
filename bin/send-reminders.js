#!/usr/bin/env node

const bootstrap = require("./bootstrap")
const remindersController = require("../controllers/reminders")

bootstrap.connectToMongo(() => {
    remindersController.sendRemindersForEventsOnDate(new Date())
})
