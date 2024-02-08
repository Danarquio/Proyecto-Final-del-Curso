import session from 'express-session';
import MongoStore from 'connect-mongo'


const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
  maxAge: 60 * 60 * 1000 // Establece la duración de la sesión a 24 horas
  }
};

export default sessionConfig;
