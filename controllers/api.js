const User = require("../models/User")
const remoteApi = require("../services/remoteApi")

const validateInput = (req, res) => {
    const response = {
        status: "failure",
        message: "you didn't pass valid parameters",
    }

    const { type } = req.params

    if (!["events", "jobs", "reminders"].includes(type)) {
        response.message = "you have to use /events, /jobs or /reminders in the params"
        return res.json(response)
    }

    const { token } = req.body
    if (!token) {
        return res.json(response)
    }

    const { eventId } = req.body
    if (type === "reminders" && !eventId) {
        response.message = "you have to use an event ID when setting a reminder"
        return res.json(response)
    }

    return { response, type, token, eventId }
}

const newUserCallback = (err, res, response) => {
    if (err) {
        response.message = "couldn't save user, duplicate entry?"
        return res.json(response)
    }
    response.status = "success"
    response.message = "user successfully saved"
    res.json(response)
}

const removeUserCallback = (res, response) => {
    if (response.result.ok) {
        response.status = "success"
        response.message = "user successfully removed"
        res.json(response)
    }
}

exports.removeUser = (req, res) => {
    const { response, type, token, eventId } = validateInput(req, res)
    User.getUserByTypeAndToken(type, token).then(user => {
        if (!user) {
            response.message = "user doesn't exist"
            return res.json(response)
        }
        const removeUserCb = response => removeUserCallback(res, response)
        if (user) {
            if (type === "reminders") {
                User.removeUserByTypeAndTokenAndEventId(type, token, eventId).then(removeUserCb)
                return
            }
            User.removeUserByTypeAndToken(type, token).then(removeUserCb)
        }
    })
}

exports.updateUser = (req, res) => {
    const { response, type, token } = validateInput(req, res)
    remoteApi.getLatestItemForType(type).then(latestItem => {
        User.setLatestItemIdForUser([token], type, latestItem.id).then(status => {
            if (status.ok) {
                response.status = "success"
                response.message = "user successfully updated"
                res.json(response)
            }
        })
    })
}

exports.postUser = (req, res) => {
    const { response, type, token, eventId } = validateInput(req, res)
    User.getUserByTypeAndToken(type, token).then(user => {
        if (user) {
            response.message = "user exists"
            return res.json(response)
        }
        const newUserCb = err => newUserCallback(err, res, response)
        if (type === "reminders") {
            const newUser = new User({ type, token, eventId })
            newUser.save(newUserCb)
            return
        }
        remoteApi.getLatestItemForType(type).then(latestItem => {
            const newUser = new User({ type, token, latestItemId: latestItem.id })
            newUser.save(newUserCb)
        })
    })
}
