const express = require('express');
const Event = require('../models/Event');

const eventRouter = express.Router();

eventRouter.post('', async (req, res) => {
  try {
    const { host, title, sport, size, date, time, location } = req.body
    const newEvent = new Event({sport, host, title, size, date, time, location});
    newEvent.teammates.push(host)
    await newEvent.save();
    res.send(newEvent);
  } catch (err) {
    res.status(401).send(err);
  }
});

eventRouter.get('', async (req, res) => {
  try {
    const allEvents = await Event.find({ active: true }).populate('teammates');
    res.send(allEvents);
  } catch (err) {
    res.status(422).send(err)
  }
});

// eventRouter.delete('', (req, res) => {
//   try {
//
//   } catch (err) {
//     res.status(422).send(err);
//   }
// });



eventRouter.put('/joinevent', async (req, res) => {
  try {
    const { teammateId, eventId } = req.body
    const event = await Event.findById(eventId);
    event.teammates.push(teammateId)
    await event.save();
    res.send(event)
  } catch (err) {
    res.status(401).send(err);
  }
});

// eventRouter.get('/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const event = await Event.findById(id)
//     res.send(event)
//   } catch (err) {
//     res.status(401).send(err)
//   }
// })

module.exports = eventRouter;