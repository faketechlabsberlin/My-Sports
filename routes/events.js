const express = require('express');
const BeachVolleyballEvent = require('../models/SportEvents/BeachVolleyballEvent');
const BasketballEvent = require('../models/SportEvents/BasketballEvent');
const FootballEvent = require('../models/SportEvents/FootballEvent');
const Event = require('../models/Event');
const helper = require('../utils/helpers');

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

// eventRouter.get('/beachvolleyball', async (req, res) => {
//     try {
//       const getBeachVolleyballEvents = await Event.find({ sport: 'beach volleyball'});
//       if (getBeachVolleyballEvents) {
//         res.send(getBeachVolleyballEvents);
//       } else {
//         res.send('No Data')
//       }
//     } catch (err) {
//       res.status(422).send(err)
//     }
// });

// eventRouter.get('/basketball', async (req, res) => {
//   try {
//     const getBasketballEvents = await Event.find({ sport: 'basketball'});
//     if (getBasketballEvents) {
//       res.send(getBasketballEvents);
//     } else {
//       res.send('No Data')
//     }
//   } catch (err) {
//     res.status(422).send(err)
//   }
// });

// eventRouter.get('/football', async (req, res) => {
//   try {
//     const getFootballEvents = await Event.find({ sport: 'football'});
//     if (getFootballEvents) {
//       res.send(getFootballEvents);
//     } else {
//       res.send('No Data')
//     }
//   } catch (err) {
//     res.status(422).send(err)
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