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
    let cutoff = new Date();
    cutoff.setDate(cutoff.getDate()-1);
    console.log(cutoff)
    // MyModel.find({modificationDate: {$lt: cutoff}}
    const allEvents = await Event.find({ date: { $gte: cutoff } }).populate('teammates');
    res.send(allEvents);
  } catch (err) {
    res.status(422).send(err)
  }
});

eventRouter.put('', async (req, res) => {
  try {
    const { eventId, title, size, date, time, location } = req.body;
    const event = await Event.findById(eventId);
    event.title = title;
    event.size = size;
    event.date = date;
    event.time = time;
    event.location = location;
    await event.save();
    res.send(event)
  } catch (err) {
    res.status(401).send(err);
  }
});

eventRouter.delete('', async (req, res) => {
  try {
    const { id } = req.body
    const deletedEvent = await Event.findByIdAndDelete(id)
    res.send(deletedEvent)
  } catch (err) {
    res.status(422).send(err);
  }
});



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

eventRouter.put('/leaveevent', async (req, res) => {
  try {
    const { teammateId, eventId } = req.body
    const event = await Event.findById(eventId);
    for (let i = 0; i < event.teammates.length; i++){ 
      if (event.teammates[i].toString() === teammateId) { 
        event.teammates.splice(i, 1); 
      }
    }
    await event.save();
    res.send(event)
  } catch (err) {
    res.status(401).send(err);
  }
});

eventRouter.put('/removeplayer', async (req, res) => {
  try {
    const { teammateId, eventId } = req.body
    const event = await Event.findById(eventId);
    for (let i = 0; i < event.teammates.length; i++){ 
      if (event.teammates[i].toString() === teammateId) { 
        event.teammates.splice(i, 1); 
      }
    }
    await event.save();
    res.send(event)
  } catch (err) {
    res.status(401).send(err);
  }
});

eventRouter.get('/myevents', async (req, res) => {
  try {
    const { myId } = req.body
    const events = await Event.find().populate('teammates');
    const myEvents = events.filter((event) => {event.teammates.some(teammate => teammate._id === myId)});
    res.send(myEvents);
  } catch (err) {
    res.status(401).send(err)
  }
})

module.exports = eventRouter;