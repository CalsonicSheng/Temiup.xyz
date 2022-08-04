import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoyaltyCard from '../../components/loyaltyCard/LoyaltyCard';
import TemiupNav from '../../components/temiupNav/TemiupNav';
import { getLoyaltyRequestHandler } from '../../redux/slices/loyaltySlice';
import customStyle from './localStyle.module.css';

export default function DashBoardPage() {
  const { isloyaltyListStateLoading, loyaltyListState } = useSelector((state) => {
    return state.loyaltyReducer;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoyaltyRequestHandler());
  }, [dispatch]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="flex-layout">
      <TemiupNav />
      <div className={`${customStyle['dashboard-page']}`}>
        <h1>NFT loyalty programs</h1>
        <div className={`${customStyle['ticket-container']}`}>
          {isloyaltyListStateLoading ? (
            <></>
          ) : loyaltyListState.data ? (
            [
              ...new Set(
                loyaltyListState.data.map((e) => {
                  return e.tier;
                })
              ),
            ].map((tier, i) => {
              return (
                <div key={i}>
                  <h3>{tier} tier</h3>
                  {loyaltyListState.data
                    .filter((e) => {
                      return e.tier === tier;
                    })
                    .map((e) => {
                      return <LoyaltyCard key={e._id} eachLoyaltyData={e} />;
                    })}
                </div>
              );
            })
          ) : (
            <h4>Something went wrong</h4>
          )}
        </div>
      </div>
    </div>
  );
}
