import React from 'react';
import customStyle from './localStyle.module.css';

export default function Loader() {
  return <div className={`${customStyle['loader']}`}></div>;
}
