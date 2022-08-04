import React from 'react';
import { useNavigate } from 'react-router-dom';
import customStyle from './localStyle.module.css';

export default function Modal({ modalStatus }) {
  const navigate = useNavigate();

  if (!modalStatus) {
    return null;
  }

  function goBackHandler() {
    navigate('/dashboard');
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={`${customStyle['overlay']}`}>
      <div className={`${customStyle['modal-container']}`}>
        <h3>NFT has successfully published to Ethereum testNet</h3>
        <button onClick={goBackHandler}>
          <h4>Gotcha</h4>
        </button>
      </div>
    </div>
  );
}
