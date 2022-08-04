import mongoose from 'mongoose';
import { LoyaltyModel } from '../models/loyaltyModel.js';
import dotenv from 'dotenv';
import { dummyDataList } from './dummyData.js';

dotenv.config();

async function createLoyalty() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

    await LoyaltyModel.deleteMany();

    dummyDataList.forEach(async (e) => {
      const newDoc = await LoyaltyModel.create(e);
      console.log(newDoc);
    });
  } catch (error) {
    console.log(error.message);
  }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function getLoyalty() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    const doc = await LoyaltyModel.findById('62e8b4a8a5aa4127d29a0eed').select({ tier: 1, loyaltyName: 1 });
    console.log(typeof doc);
    console.log(doc);
    console.log(doc.loyaltyName);
    doc.loyaltyName = 'lolol';
    console.log(doc);
  } catch (error) {
    console.log(error.message);
  }
}

async function getLoyaltyList() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    const doc = await LoyaltyModel.find({ _id: '62e8b4a8a5aa4127d29a0eed' });
    console.log(typeof doc);
    console.log(doc);
  } catch (error) {
    console.log(error.message);
  }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// for any backend server updating: The goal here is to make the update reflect in the database and also return such NEWLY updated doc so we can also send back to frontend as well

async function updateLoyalty1() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    const newUpdated = await LoyaltyModel.findOneAndUpdate(
      { _id: '62e8a8c1289e753e9fdd7244' },
      {
        loyaltyName: 'fuck',
        $set: {
          tier: 'noob',
        },
      },
      { new: true }
    );
    console.log(newUpdated);
  } catch (error) {
    console.log(error.message);
  }
}

async function updateLoyalty2() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    const targetDoc = await LoyaltyModel.findById('62e8a8c1289e753e9fdd7244'); // find target doc first
    targetDoc.loyaltyName = 'fuck shit'; // then update this doc instance
    targetDoc.totalDuration = '80'; // then update this doc instance
    await targetDoc.save(); // update this doc instance
    console.log(targetDoc); // also send back this updated doc instance
  } catch (error) {
    console.log(error.message);
  }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function deleteAllLoyalty() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

    await LoyaltyModel.deleteMany();
  } catch (error) {
    console.log(error.message);
  }
}

// delete operation does not and should not return any resultant doc

async function deleteOneLoyalty() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

    const result = await LoyaltyModel.deleteOne({ tier: 'unlimited' });
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
deleteAllLoyalty();
