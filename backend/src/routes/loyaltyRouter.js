import express from 'express';
import { createNewLoyaltyHandler, getLoyaltyHandler } from '../controller/loyaltyController.js';

const loyaltyRouter = express.Router();

loyaltyRouter.route('/').get(getLoyaltyHandler);

loyaltyRouter.route('/').post(createNewLoyaltyHandler);

export { loyaltyRouter };
