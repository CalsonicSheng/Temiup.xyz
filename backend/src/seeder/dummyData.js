const dummyDataList = [
  {
    tier: 'limited',
    loyaltyName: 'goldkieMonkey',
    loyaltyType: 'point-reward',
    loyaltyRule: {
      pointsRequired: '100',
      discountPercent: '40',
      exclusiveEvent: true,
    },
    desc: 'Lorem ipsum dolor sit enim ad minim veniam. Duis aute irure dolor in reprehennt occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isTimeLimited: true,
    isQuantityLimited: true,
    totalQuantity: 27,
    totalDuration: 7,
    claim: '14',
  },
  {
    tier: 'limited',
    loyaltyName: 'platiumnaire',
    loyaltyType: 'premium-membership',
    loyaltyRule: {
      membershipPrice: '150',
      discountPercent: '30',
      exclusiveEvent: true,
      premiumShipping: true,
    },
    desc: 'Lorem ipsum dolor sit enim ad minim veniam. Duis aute irure dolor in reprehennt occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isTimeLimited: false,
    isQuantityLimited: true,
    totalQuantity: 27,
    claim: '19',
  },
];

export { dummyDataList };
