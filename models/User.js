const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    token: String,
    type: String,
    latestItemId: String
  },
  { timestamps: true }
);

userSchema.static("getUserByTypeAndToken", function(type, token) {
  return this.findOne({ type, token });
});

userSchema.static("removeUserByTypeAndToken", function(type, token) {
  return this.remove({ type, token });
});

userSchema.static("getUsersByType", function(type, lastItemId) {
  return this.find({ type, lastItemId: { $ne: lastItemId } });
});

userSchema.static("setLatestItemIdForUser", function(tokens, type, itemId) {
  console.log("set lateste item id to: ", itemId);
  const criteria = { token: { $in: tokens }, type: type };
  return this.update(criteria, { $set: { latestItemId: itemId } });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
