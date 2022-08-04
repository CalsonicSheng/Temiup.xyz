import React from 'react';
import customStyle from './localStyle.module.css';
import goldTierAvatar from '../../assets/nftImg/goldTier.jpg';
import platTierAvatar from '../../assets/nftImg/platTier.jpg';
import CountDown from '../countDown/CountDown';

export default function LoyaltyCard({ eachLoyaltyData }) {
  function getStatusColorHandler() {
    let statusColor;

    switch (eachLoyaltyData.status) {
      case 'on-going':
        statusColor = 'rgb(175, 214, 117)';
        break;

      case 'ended':
        statusColor = 'rgb(186,255,201)';
        break;

      default:
        break;
    }

    return statusColor;
  }

  // ---------------------------------------------------------------------------

  function getLoyaltyCardColorHandler() {
    let loyaltyColor;

    switch (eachLoyaltyData.tier) {
      case 'unlimited':
        loyaltyColor = 'rgb(245, 143, 240)';
        break;

      case 'limited':
        loyaltyColor = 'rgb(212,175,55)';
        break;

      default:
        break;
    }

    return loyaltyColor;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className={`${customStyle['loyalty-card']} `}>
      {/* --------------------------------------------------------------------- */}

      <div className={`${customStyle['loyalty-color-container']} `} style={{ backgroundColor: getLoyaltyCardColorHandler() }}></div>

      {/* --------------------------------------------------------------------- */}

      <div className={`${customStyle['loyalty-avatar-container']} `}>
        <img src={eachLoyaltyData.tier === 'unlimited' ? platTierAvatar : goldTierAvatar} alt={'avatar-img'} />
      </div>

      {/* --------------------------------------------------------------------- */}

      <div className={`${customStyle['loyalty-name-type-container']} `}>
        <h4> {eachLoyaltyData.loyaltyName}</h4>
        <h4> {eachLoyaltyData.loyaltyType}</h4>
        <h4>
          {eachLoyaltyData.loyaltyType === 'premium-membership' ? `membership price: ${eachLoyaltyData.loyaltyRule.membershipPrice}$` : `reward points: ${eachLoyaltyData.loyaltyRule.pointsRequired}`}
        </h4>
      </div>

      {/* --------------------------------------------------------------------- */}

      <div className={`${customStyle['status-container']} `} style={{ backgroundColor: getStatusColorHandler() }}>
        <i className="fas fa-fire"></i>
        <span>{eachLoyaltyData.status}</span>
        <i className="fas fa-fire"></i>
      </div>

      {/* --------------------------------------------------------------------- */}

      <div className={`${customStyle['loyalty-rule']} `}>
        <h4>{eachLoyaltyData.loyaltyRule.discountPercent !== '' ? `discount: ${eachLoyaltyData.loyaltyRule.discountPercent}%` : ''}</h4>
        <h4>{eachLoyaltyData.loyaltyRule.premiumShipping === true ? `Premium shipping  ✔` : ''} </h4>
        <h4>{eachLoyaltyData.loyaltyRule.exclusiveProduct === true ? `Exclusive Product ✔` : ''}</h4>
        <h4>{eachLoyaltyData.loyaltyRule.exclusiveEvent === true ? `Exclusive event ✔` : ''}</h4>
      </div>

      {/* --------------------------------------------------------------------- */}

      <div className={`${customStyle['quantity-container']} `}>
        {eachLoyaltyData.isQuantityLimited ? (
          <>
            <div>
              <h4>Claim progress</h4>
              <span>{eachLoyaltyData.claim} /</span> <span>{eachLoyaltyData.totalQuantity}</span>
            </div>

            <div className={`${customStyle['claim-progress-bar']} `}>
              <div className={`${customStyle['progress-bar-indicator']} `} style={{ width: `${(eachLoyaltyData.claim / eachLoyaltyData.totalQuantity) * 100}%` }}>
                <div className={`${customStyle['wave-motion']} `}></div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <i className="fa-solid fa-infinity"></i>
            <h4>{eachLoyaltyData.totalQuantity}</h4>
          </div>
        )}
      </div>

      {/* --------------------------------------------------------------------- */}

      <div className={`${customStyle['time-container']} `}>
        {eachLoyaltyData.isTimeLimited ? (
          <div>
            <h4>{`Ends in ${eachLoyaltyData.totalDuration} days`}</h4>
            <CountDown startDate={eachLoyaltyData.createdAt} totalDuration={eachLoyaltyData.totalDuration} />
          </div>
        ) : (
          <div>
            <i className="fa-solid fa-infinity"></i>
            <h4>No end date</h4>
          </div>
        )}
      </div>
    </div>
  );
}
