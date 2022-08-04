import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globalStyle.css';
import { MoralisProvider } from "react-moralis";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
<MoralisProvider serverUrl="https://qxb2qzsusx9o.usemoralis.com:2053/server" appId="RjXn4ysjKR0LSAVCCzip0nHlfKUPuv6oSfl7YZLN">
<App />
</MoralisProvider>
);
