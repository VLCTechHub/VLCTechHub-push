# Expo push notificaton server

A simple node.js server to store user credentials in a MongoDB database and send notifications to them via a Heroku scheduler command (`/bin`).

It is the server-side implementation of [Expo push notifications](https://docs.expo.io/versions/latest/guides/push-notifications.html) in node.js for which Expo themselves provide an identical tool [here](https://expo.io/dashboard/notifications), without the user saving part.

It is based on the pretty extensive [hackathon-starter boilerplate](https://github.com/sahat/hackathon-starter) where some of the scaffold comes from, but most of its features have been removed for simplification purposes.

## Requirements

You'll need a running MongoDB instance for this to work. Otherwise, node won't know where to store the user data.

## Setup

```
npm install
```

## Usage

```
npm start
```

## Tests

```
npm test
```

### API calls

#### Save a new user:

POST `/user/:type`

#### Update a user's latest item ID:

PUT `/user/:type`

#### Delete a user:

DELETE `/user/:type`

- `:type` can be `events` or `jobs`
- Calls are `x-www-form-urlencoded` and contain one parameter:
  - `token`: Expo-generated push notification token

### Sending push notifications to users

The command `node bin/send-notifications.js` is executed every full hour on Heroku using a scheduler
