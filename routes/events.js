const express = require('express');
const BeachVolleyballEvent = require('../models/SportEvents/BeachVolleyballEvent');
const BasketballEvent = require('../models/SportEvents/BasketballEvent');
const FootballEvent = require('../models/SportEvents/FootballEvent');
const helper = require('../utils/helpers');

const eventRouter = express.Router();

eventRouter.post('', async (req, res) => {
  try {
    const { host, title, sport, size, date, time, location } = req.body
    if (sport === 'beach volleyball') {
      const newBeachVolleyballEvent = new BeachVolleyballEvent({host, title, size, date, time, location});
      newBeachVolleyballEvent.teammates.push(host)
      await newBeachVolleyballEvent.save();
      res.send(newBeachVolleyballEvent);
    } else if (sport === 'basketball') {
      const newBasketballEvent = new BasketballEvent({host, title, size, date, time, location});
      newBasketballEvent.teammates.push(host)
      await newBasketballEvent.save();
      res.send(newBasketballEvent);
    } else if (sport === 'football') {
      const newFootballEvent = new FootballEvent({host, title, size, date, time, location});
      newFootballEvent.teammates.push(host)
      await newFootballEvent.save();
      res.send(newFootballEvent);
    } else {
      throw new Error('Something went wrong');
    }
  } catch (err) {
    res.status(401).send(err);
  }
});

// eventRouter.delete('', (req, res) => {
//   try {
//
//   } catch (err) {
//     res.status(422).send(err);
//   }
// });

eventRouter.get('/beachvolleyball', async (req, res) => {
    try {
      const getBeachVolleyballEvents = await BeachVolleyballEvent.find();
      if (getBeachVolleyballEvents) {
        res.send(getBeachVolleyballEvents);
      } else {
        res.send('No Data')
      }
    } catch (err) {
      res.status(422).send(err)
    }
});

eventRouter.get('/basketball', async (req, res) => {
  try {
    const getBasketballEvents = await BasketballEvent.find();
    if (getBasketballEvents) {
      res.send(getBasketballEvents);
    } else {
      res.send('No Data')
    }
  } catch (err) {
    res.status(422).send(err)
  }
});

eventRouter.get('/football', async (req, res) => {
  try {
    const getFootballEvents = await FootballEvent.find();
    if (getFootballEvents) {
      res.send(getFootballEvents);
    } else {
      res.send('No Data')
    }
  } catch (err) {
    res.status(422).send(err)
  }
});


eventRouter.put('/beachvolleyball', async (req, res) => {
  try {
    const { teammateId, eventId } = req.body
    const beachVolleyballEvent = await BeachVolleyballEvent.findById(eventId);
    beachVolleyballEvent.teammates.push(teammateId)
    await beachVolleyballEvent.save();
  } catch (err) {
    res.status(401).send(err);
  }
});

eventRouter.put('/basketball', async (req, res) => {
  try {
    const { teammateId, eventId } = req.body
    const basketballEvent = await BasketballEvent.findById(eventId);
    basketballEvent.teammates.push(teammateId)
    await basketballEvent.save();
  } catch (err) {
    res.status(401).send(err);
  }
});

eventRouter.put('/football', async (req, res) => {
  try {
    const { teammateId, eventId } = req.body
    const footballEvent = await FootballEvent.findById(eventId);
    footballEvent.teammates.push(teammateId)
    await footballEvent.save();
  } catch (err) {
    res.status(401).send(err);
  }
});

module.exports = eventRouter;