const express = require('express');
const Message = require('../models/Message');

const messageRouter = express.Router();

messageRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const messages = await Message.find({event: id}).populate('user')
    res.send(messages)
  } catch (err) {
    res.status(401).send(err)
  }
})

module.exports = messageRouter;