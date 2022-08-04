import { LoyaltyModel } from '../models/loyaltyModel.js';

// when "next" takes in any parameter, it will always take the flow directly to THE LAST MIDDLEWARE (app.use) for error response handling
async function getLoyaltyHandler(req, res, next) {
  console.log('getLoyaltyHandler run');
  try {
    // this later on needs to be filtered based on each store ID
    const fetchedLoyaltyList = await LoyaltyModel.find().sort({ createdAt: -1 });
    res.status(200).json(fetchedLoyaltyList);
  } catch (error) {
    console.log(error);
    const customizedErrorObject = { customizedMessage: 'loyalty can not be fully fetched', responseStatus: 404 };
    next(customizedErrorObject);
  }
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------

async function createNewLoyaltyHandler(req, res, next) {
  console.log('createNewLoyaltyHandler run');
  const requestBody = req.body;
  // we add setTimeout to simulate the time requirement for connecting to ethereum
  setTimeout(async () => {
    try {
      const newLoyaltyDoc = await LoyaltyModel.create(requestBody);
      res.status(200).json('success');
    } catch (error) {
      console.log(error);
      const customizedErrorObject = { customizedMessage: 'Some inputs are not correct. Please check again', responseStatus: 400 };
      next(customizedErrorObject);
    }
  }, 6000);
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------

export { getLoyaltyHandler, createNewLoyaltyHandler };
