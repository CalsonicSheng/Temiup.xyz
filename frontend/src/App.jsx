import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import TemiupNav from './components/temiupNav/TemiupNav';
import DashBoardPage from './pages/dashBoardPage/DashBoardPage';
import HomePage from './pages/homePage/HomePage';
import LoyaltyPublishPage from './pages/loyaltyPublishPage/LoyaltyPublishPage';
import { reduxStore } from './redux/store';

function App() {
  return (
    <Provider store={reduxStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/dashboard" element={<DashBoardPage />}></Route>
          <Route path="/loyalty-publish" element={<LoyaltyPublishPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
