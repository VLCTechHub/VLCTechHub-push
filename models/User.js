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

userSchema.static("getUsersByType", function(type, latestItemId) {
  return this.find({ type, latestItemId: { $ne: latestItemId } });
});

userSchema.static("setLatestItemIdForUser", function(tokens, type, itemId) {
  const criteria = { token: { $in: tokens }, type: type };
  return this.update(
    criteria,
    { $set: { latestItemId: itemId } },
    { multi: true }
  );
});

const User = mongoose.model("User", userSchema);

module.exports = User;
