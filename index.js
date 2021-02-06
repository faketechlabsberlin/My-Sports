require('dotenv').config(); //for future environmental variables

const session = require('express-session'); //for session with cookies 
const MongoDBStore = require('connect-mongo')(session); 
const express = require('express'); //server framework
const app = express();
const mongoose = require('mongoose'); //library to facilitate DB communications
const path = require('path');
const port = process.env.PORT || 5000;
const passport = require('passport'); //for registration and login functinons
const localStrategy = require('passport-local'); //local strategy, facebook and google logins can be implemented later
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
}); //websocket for chatroom
const cors = require('cors'); //for seperate front end to back end post

const User = require('./models/User'); //User database model
const Message = require('./models/Message');//Message database model

const routes = require('./routes/index');//API routes


const dbUrl =  process.env.DB_URL || 'mongodb://localhost:27017/mysports' //db connection on local host first

mongoose.connect(dbUrl, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {
        console.log(`Mongoose connection open!`);
    })
    .catch(err => {
        console.log(err);
    }) 

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "my_sports_front", "build")))
app.use(cors()); //express middlewares

const secret = process.env.SECRET || 'temporarysecret'

const store = new MongoDBStore({ // store sessions on mongo
    url: dbUrl,
    secret: secret,
    touchAfter: 24 * 60 * 60
});

store.on('error', function (e) {
    console.log('SESSION ERROR', e)
})

const sessionConfig = { //config for session (cookies)
    name: 'session',
    store: store,
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //1 week
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
}
app.use(session(sessionConfig))

app.use(passport.initialize()); // passport authentication and authorization setup, local strategy
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
}) //might not need

const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.use('/users', routes.userRoutes);
apiRouter.use('/session', routes.sessionRoutes);
apiRouter.use('/event', routes.eventRoutes);
apiRouter.use('/message', routes.messageRoutes); //All API routes

io.on('connection', (socket) => { //testing socket usage
    socket.on('joinRoom', (id) => {
        socket.join(id);
        console.log('User joined chat foe event with id: ' + id)
    });
    socket.on('leaveRoom', (id) => {
        socket.leave(id);
        console.log('User left chat for event with id: ' + id)
    });
    socket.on('message', async (data) => {
        const newMessage = new Message(data);
        await newMessage.save();
        const messageToEmit = await Message.findById(newMessage._id).populate('user')
        io.to(data.event).emit('displayMessage', messageToEmit)
    });
    
    // socket.broadcast.emit('message', 'A new teammate has joined the chat')
    socket.on('disconnect', () => {
    //     io.emit('message', 'A teammate has left the chat')
        console.log('user disconnected');
    });
    // socket.on('chatMessage', (msg) => {
    //     io.emit('message', msg)
    // })
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/my_sports_front/build/index.html'));
});
   
server.listen(port, () => {
    console.log(`Server listening on ${port}`)
}) //server running on localhost:3000