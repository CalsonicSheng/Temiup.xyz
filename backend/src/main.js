import { serverConfigHandler, app } from './config/serverConfig.js';
import { globalMiddlewareHandler } from './middlewares/globalMiddlewares.js';
import express from 'express';
import { loyaltyRouter } from './routes/loyaltyRouter.js';

serverConfigHandler();

// -----------------------------------------------------------------------

globalMiddlewareHandler(app, express);

app.use('/loyalty', loyaltyRouter);

// -----------------------------------------------------------------------

app.use((customizedErrorObject, req, res, next) => {
  console.log(`error sent from backend`);
  res.status(customizedErrorObject.responseStatus).json(customizedErrorObject);
});
