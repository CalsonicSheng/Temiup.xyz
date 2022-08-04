import mongoose from 'mongoose';

const loyaltySchema = new mongoose.Schema(
  {
    // note that for any db collection that is user-specific oriented, you must include "user id" as one of the fields in the schema | this is for later query on specific-user-only
    // storeId: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    tier: {
      type: String,
      required: true,
      trim: true,
    },
    loyaltyName: {
      type: String,
      required: true,
      trim: true,
    },
    // so far we offer two loyalty service, it can be either "premium membership" or "point-reward"
    loyaltyType: {
      type: String,
      required: true,
      trim: true,
    },
    // "premium-membership" needs upfront payment amount | "point-reward" needs certain amount of points
    loyaltyRule: {
      membershipPrice: {
        type: String,
        default: '',
      },
      premiumShipping: {
        type: Boolean,
        default: false,
      },
      exclusiveProduct: {
        type: Boolean,
        default: false,
      },
      exclusiveEvent: {
        type: Boolean,
        default: false,
      },
      pointsRequired: {
        type: String,
        default: '',
      },
      discountPercent: {
        type: String,
        default: '',
      },
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    isTimeLimited: {
      type: Boolean,
      required: true,
    },
    isQuantityLimited: {
      type: Boolean,
      required: true,
    },

    // if a field that has "default" property, typically the "required" property is not needed and these are not required to defined when create a new doc under this schema
    // "default" field can either direct data, expression or function call (function call is always referred over expression)
    // it sets the default value of that field to the result of calling the fun function when doc under this schema is created (you can also take in other field value "through this")
    status: {
      type: String,
      trim: true,
      default: 'on-going',
    },
    // in days
    totalDuration: {
      type: String,
      trim: true,
      default: function () {
        if (!this.isTimeLimited) {
          return 'unlimited';
        }
      },
    },
    totalQuantity: {
      type: String,
      trim: true,
      default: function () {
        if (!this.isQuantityLimited) {
          return 'unlimited';
        }
      },
    },
    // it is being tested that mongoose will AUTO to convert any string-based number to number type
    // recall again any arithmetic operation can be conducted between number and string number for /, -, *,
    claim: {
      type: Number,
      default: 0,
    },
  },
  {
    // all timestamps in mongo is also based on current UTC time standard
    timestamps: true,
  }
);

const LoyaltyModel = mongoose.model('loyalties', loyaltySchema);

export { LoyaltyModel };
