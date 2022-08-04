import React, { useEffect, useState } from 'react';
import customStyle from './localStyle.module.css';
// these images are hard stored
import goldTierAvatar from '../../assets/nftImg/goldTier.jpg';
import platTierAvatar from '../../assets/nftImg/platTier.jpg';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewLoyaltyRequestHandler, loyaltySliceActions } from '../../redux/slices/loyaltySlice';
import Loader from '../../components/loader/Loader';
import Modal from '../../components/modal/Modal';
import TemiupNav from '../../components/temiupNav/TemiupNav';

export default function LoyaltyPublishPage() {
  const dispatch = useDispatch();

  const [modalStatus, setModalStatus] = useState(false);

  const { isProcessing, processingResult } = useSelector((state) => {
    return state.loyaltyReducer;
  });

  // pre-defined tier List
  const tierList = ['unlimited', 'limited'];

  // pre-defined loyalty type
  const loyaltyTypeList = ['premium-membership', 'point-reward'];

  const [newLoyaltyFormData, setNewLoyaltyFormData] = useState({
    tier: 'unlimited',
    loyaltyName: '',
    loyaltyType: 'premium-membership',
    loyaltyRule: {},
    desc: '',
    isTimeLimited: false,
    isQuantityLimited: false,
    totalDuration: 'unlimited',
    totalQuantity: 'unlimited',
  });

  const [newLoyaltyRuleData, setNewLoyaltyRuleData] = useState({
    membershipPrice: '',
    pointsRequired: '',
    discountPercent: '',
    premiumShipping: false,
    exclusiveProduct: false,
    exclusiveEvent: false,
  });

  // ---------------------------------------------------------------------------------------------------------------------------------------

  function newLoyaltyFormInputHandler(e) {
    const fieldName = e.target.name;
    let userInput;

    if (fieldName === 'isTimeLimited' || fieldName === 'isQuantityLimited') {
      userInput = e.target.checked;
    } else {
      userInput = e.target.value;
    }

    setNewLoyaltyFormData((preState) => {
      return { ...preState, [fieldName]: userInput };
    });
  }

  function newLoyaltyRuleInputHandler(e) {
    const fieldName = e.target.name;
    let userInput;

    if (fieldName === 'premiumShipping' || fieldName === 'exclusiveProduct' || fieldName === 'exclusiveEvent') {
      userInput = e.target.checked;
    } else {
      userInput = e.target.value;
    }

    setNewLoyaltyRuleData((preState) => {
      return { ...preState, [fieldName]: userInput };
    });
  }

  function formSubmitHandler(e) {
    e.preventDefault();
    newLoyaltyFormData.loyaltyRule = newLoyaltyRuleData;
    dispatch(createNewLoyaltyRequestHandler(newLoyaltyFormData));
  }

  useEffect(() => {
    if (newLoyaltyFormData.isQuantityLimited === false) {
      newLoyaltyFormData.totalQuantity = 'unlimited';
    }
    if (newLoyaltyFormData.isTimeLimited === false) {
      newLoyaltyFormData.totalDuration = 'unlimited';
    }

    if (newLoyaltyFormData.loyaltyType === 'premium-membership') {
      newLoyaltyRuleData.pointsRequired = '';
    }
    if (newLoyaltyFormData.loyaltyType === 'point-reward') {
      newLoyaltyRuleData.membershipPrice = '';
    }
  }, [newLoyaltyFormData, newLoyaltyRuleData]);

  useEffect(() => {
    if (processingResult.data) {
      setModalStatus(true);
    }
  }, [processingResult.data, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(loyaltySliceActions.resetProcessingResultHandler());
    };
  }, [dispatch]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="flex-layout">
      <TemiupNav />
      <>
        <Modal modalStatus={modalStatus} />
        <div className={`${customStyle['loyalty-page']}`}>
          <h1>Custmoize and publish new NFT loyalty</h1>
          <form onSubmit={formSubmitHandler}>
            <section>
              {/* ----------------------------------------------------------------------------------------------------------------------------------------------- */}

              <label htmlFor="tier">Tier selection</label>
              <select name="tier" id="tier" onChange={newLoyaltyFormInputHandler} required={true} value={newLoyaltyFormData.tier}>
                {tierList.map((e, i) => {
                  return (
                    <option key={i} value={e}>
                      {e}
                    </option>
                  );
                })}
              </select>

              {/* ----------------------------------------------------------------------------------------------------------------------------------------------- */}

              <label htmlFor="loyaltyName">Loyalty name</label>
              <input type="text" id="loyaltyName" name="loyaltyName" onChange={newLoyaltyFormInputHandler} required={true} value={newLoyaltyFormData.loyaltyName} />

              {/* ----------------------------------------------------------------------------------------------------------------------------------------------- */}

              <label htmlFor="loyaltyType">loyalty type selection</label>
              <select name="loyaltyType" id="loyaltyType" onChange={newLoyaltyFormInputHandler} required={true} value={newLoyaltyFormData.loyaltyType}>
                {loyaltyTypeList.map((e, i) => {
                  return (
                    <option key={i} value={e}>
                      {e}
                    </option>
                  );
                })}
              </select>

              {/* ----------------------------------------------------------------------------------------------------------------------------------------------- */}

              <label htmlFor="desc">Description</label>
              <textarea type="text" id="desc" name="desc" onChange={newLoyaltyFormInputHandler} required={true} value={newLoyaltyFormData.desc} />

              {/* ----------------------------------------------------------------------------------------------------------------------------------------------- */}

              {newLoyaltyFormData.tier === 'limited' ? (
                <>
                  <label htmlFor="isTimeLimited">Set time constraint</label>
                  <label className={`${customStyle['switch']}`}>
                    <input type="checkbox" id="isTimeLimited" name="isTimeLimited" onChange={newLoyaltyFormInputHandler} value={newLoyaltyFormData.isTimeLimited} />
                    <span className={`${customStyle['slider']} ${customStyle['round']} `}></span>
                  </label>

                  {newLoyaltyFormData.isTimeLimited ? (
                    <div>
                      <label htmlFor="totalDuration">Set days to expire</label>
                      <input type="number" id="totalDuration" name="totalDuration" onChange={newLoyaltyFormInputHandler} value={newLoyaltyFormData.totalDuration} />
                    </div>
                  ) : (
                    <></>
                  )}

                  {/* ----------------------------------------------------------------------------------------------------------------------------------------------- */}

                  <label htmlFor="isQuantityLimited">Set quantity constraint</label>
                  <label className={`${customStyle['switch']}`}>
                    <input type="checkbox" id="isQuantityLimited" name="isQuantityLimited" onChange={newLoyaltyFormInputHandler} value={newLoyaltyFormData.isQuantityLimited} />
                    <span className={`${customStyle['slider']} ${customStyle['round']} `}></span>
                  </label>

                  {newLoyaltyFormData.isQuantityLimited ? (
                    <div>
                      <label htmlFor="totalQuantity">Set total quantity</label>
                      <input type="number" id="totalQuantity" name="totalQuantity" onChange={newLoyaltyFormInputHandler} value={newLoyaltyFormData.totalQuantity} />
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}

              <button type="submit" className={`${customStyle['submit-button']}`}>
                {isProcessing ? <Loader /> : <h3>Publish to Ethereum</h3>}
              </button>
            </section>

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <section>
              {newLoyaltyFormData.loyaltyType === 'premium-membership' ? (
                <>
                  <label htmlFor="membershipPrice">
                    Set membership price <i className="fa-solid fa-dollar-sign"></i>
                  </label>
                  <input type="number" id="membershipPrice" name="membershipPrice" onChange={newLoyaltyRuleInputHandler} value={newLoyaltyRuleData.membershipPrice} required={true} />
                </>
              ) : (
                <>
                  <label htmlFor="pointsRequired">
                    Set reward point <i className="fa-solid fa-star"></i>
                  </label>
                  <input type="number" id="pointsRequired" name="pointsRequired" onChange={newLoyaltyRuleInputHandler} value={newLoyaltyRuleData.pointsRequired} required={true} />
                </>
              )}

              {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

              <label htmlFor="discountPercent">Set discount percentage %</label>
              <input type="number" id="discountPercent" name="discountPercent" onChange={newLoyaltyRuleInputHandler} value={newLoyaltyRuleData.discountPercent} />

              {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

              <label htmlFor="premiumShipping" className={`${customStyle['check-box-container']}`}>
                <input type="checkbox" id="premiumShipping" name="premiumShipping" onChange={newLoyaltyRuleInputHandler} value={newLoyaltyRuleData.premiumShipping} />
                <span className={`${customStyle['checkmark']}`}></span>
                premium shipping
              </label>

              {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

              <label htmlFor="exclusiveProduct" className={`${customStyle['check-box-container']}`}>
                <input type="checkbox" id="exclusiveProduct" name="exclusiveProduct" onChange={newLoyaltyRuleInputHandler} value={newLoyaltyRuleData.exclusiveProduct} />
                <span className={`${customStyle['checkmark']}`}></span>
                exclusive product
              </label>

              {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

              <label htmlFor="exclusiveEvent" className={`${customStyle['check-box-container']}`}>
                <input type="checkbox" id="exclusiveEvent" name="exclusiveEvent" onChange={newLoyaltyRuleInputHandler} value={newLoyaltyRuleData.exclusiveEvent} />
                <span className={`${customStyle['checkmark']}`}></span>
                exclusive event
              </label>
            </section>

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <section>
              <label htmlFor="avatar-badge">
                <h4>Avatar-badge</h4>
              </label>
              <div className={`${customStyle['avatar-preview']}`}>
                <img src={newLoyaltyFormData.tier === 'unlimited' ? platTierAvatar : goldTierAvatar} alt={'avatar-badge'} />
              </div>

              <input type="file" className={`${customStyle['upload-nft-button']}`} />
            </section>
          </form>
        </div>
      </>
    </div>
  );
}
