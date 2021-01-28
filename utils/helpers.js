module.exports.sessionizeUser = user => {
    return { userId: user.id, username: user.username, name: user.name, email: user.email };
  }