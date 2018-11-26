const User = require("../models/User");
const remoteApi = require("../services/remoteApi");

const validateInput = (req, res) => {
  const response = {
    status: "failure",
    message: "you didn't pass valid parameters"
  };

  const { type } = req.params;

  if (!["events", "jobs"].includes(type)) {
    response.message = "you have to use /events or /jobs in the params";
    return res.json(response);
  }

  const { token } = req.body;
  if (!token) {
    return res.json(response);
  }

  return { response, type, token };
};

exports.removeUser = (req, res) => {
  const { response, type, token } = validateInput(req, res);
  User.getUserByTypeAndToken(type, token).then(user => {
    if (!user) {
      response.message = "user doesn't exist";
      return res.json(response);
    }
    if (user) {
      User.removeUserByTypeAndToken(type, token).then(response => {
        if (response.result.ok) {
          response.status = "success";
          response.message = "user successfully removed";
          res.json(response);
        }
      });
    }
  });
};

exports.updateUser = (req, res) => {
  const { response, type, token } = validateInput(req, res);
  remoteApi.getLatestItemForType(type).then(latestItem => {
    User.setLatestItemIdForUser([token], type, latestItem.id).then(status => {
      if (status.ok) {
        response.status = "success";
        response.message = "user successfully updated";
        res.json(response);
      }
    });
  });
};

exports.postUser = (req, res) => {
  const { response, type, token } = validateInput(req, res);
  User.getUserByTypeAndToken(type, token).then(user => {
    if (user) {
      response.message = "user exists";
      return res.json(response);
    }
    remoteApi.getLatestItemForType(type).then(latestItem => {
      const newUser = new User({ type, token, latestItemId: latestItem.id });
      newUser.save(err => {
        if (err) {
          response.message = "couldn't save user, duplicate entry?";
          return res.json(response);
        }
        response.status = "success";
        response.message = "user successfully saved";
        res.json(response);
      });
    });
  });
};
