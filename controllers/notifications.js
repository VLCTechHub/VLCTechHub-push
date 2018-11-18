const User = require("../models/User");
const remoteApi = require("../services/remoteApi");
const Expo = require("expo-server-sdk");

const notificationTitles = {
  events: "Hay un nuevo evento",
  jobs: "Hay una nueva oferta de trabajo"
};

// Create a new Expo SDK client
const expo = new Expo();

const sendNotifications = (tokens, body) => {
  let messages = [];
  for (let token of tokens) {
    if (!Expo.isExpoPushToken(token)) {
      console.error(`Push token ${token} is not a valid Expo push token`);
      continue;
    }
    messages.push({
      to: token,
      sound: "default",
      title: body.title,
      body: body.message
    });
  }

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

const sendPushNotificationsForType = type => {
  remoteApi.getLatestItemForType(type).then(latestItem => {
    User.getUsersToNotify(type, latestItem.id).then(users => {
      const tokens = users.map(user => user.token);
      sendNotifications(tokens, {
        title: notificationTitle[type],
        message: latestItem.title
      });
      User.setLatestItemIdForUser(tokens, type, latestEvent.id);
    });
  });
};

module.exports = {
  sendPushNotificationsForType
};
