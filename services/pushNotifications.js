const Expo = require("expo-server-sdk")

// Create a new Expo SDK client
const expo = new Expo()

const sendNotifications = (tokens, { title, message, data }) => {
    let messages = []
    for (let token of tokens) {
        if (!Expo.isExpoPushToken(token)) {
            console.error(`Push token ${token} is not a valid Expo push token`)
            continue
        }
        messages.push({
            to: token,
            sound: "default",
            title: title,
            body: message,
            data,
        })
    }

    let chunks = expo.chunkPushNotifications(messages)
    let tickets = []
    ;(async () => {
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk)
                tickets.push(...ticketChunk)
            } catch (error) {
                console.error(error)
            }
        }
    })()
}

module.exports = {
    sendNotifications,
}
