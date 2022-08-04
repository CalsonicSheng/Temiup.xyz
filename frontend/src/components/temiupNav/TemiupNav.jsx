import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import customStyle from './localStyle.module.css';

export default function TemiupNav() {
  const navigate = useNavigate();

  function goBackHandler() {
    navigate('/dashboard');
  }

  return (
    <nav className={`${customStyle['nav-bar']}`}>
      <div className={`${customStyle['logo-container']}`}>
        <Link to={'/dashboard'} className="link-decoration">
          <span>Tem</span>
          <span className={`${customStyle['i-letter']}`}>i</span>
          <span>up</span>
        </Link>
      </div>

      <div className={`${customStyle['control-container']}`}>
        <Link to={'/loyalty-publish'}>
          <i className="fa-solid fa-plus"></i>
        </Link>
        <i className="fa-solid fa-angles-left" onClick={goBackHandler}></i>
        <Link to={'/'}>
          <i className="fa-solid fa-house"></i>
        </Link>
      </div>
    </nav>
  );
}
