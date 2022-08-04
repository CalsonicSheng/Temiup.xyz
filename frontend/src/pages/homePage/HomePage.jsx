import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/productCard/ProductCard';
import { publicProductList, nftVerifiedProductList } from './homePageData';
import customStyle from './localStyle.module.css';
import metamask from '../../assets/homeImg/metamask.png';
import VerifiedProductCard from '../../components/verifiedProductCard/VerifiedProductCard';
import { useMoralis } from "react-moralis";

export default function HomePage() {
  const [nftVerified, setNftVerified] = useState(false);

  if (nftVerified) {
    // conditionally import boostrap css
    require('../../styles/bootstrap.min.css');
  }

  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

    useEffect(() => {
    if (isAuthenticated) {
      setNftVerified(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const login = async () => {
    if (!isAuthenticated) {

      await authenticate({signingMessage: "Welcome to Temiup, your rewards await." })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }

  return (
    <>
      {nftVerified ? (
        <div className="main-content-section">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-3">
            <div className="container">
              {/* Ttile ----------------------------------------------------------------------------------------------------------------------- */}

              <h2 className="m-0 fw-bold">Naked & Famous (Welcome CalsonSheng.eth)</h2>

              {/* collapse button (when width is shrinked) ------------------------------------------------------------------------------------- */}

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarColor01"
                aria-controls="navbarColor01"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              {/* nav-items --------------------------------------------------------------------------------------------------------------------- */}

              <div className="collapse navbar-collapse d-flex align-items-center" id="navbarColor01">
                <ul className="navbar-nav ms-auto">
                  <li  className="nav-item">

                    <img onClick={logOut} src={metamask} alt="metamask" className={`${customStyle['meta-mask-img-verified']}`} />
                  </li>
                  <Link to={'/dashboard'} className="link-decoration">
                    <li className="nav-item">
                      <h2 className="d-inline p-0 m-0 ms-4">Tem</h2>
                      <h2 className="d-inline p-0 m-0 text-success fw-bolder">i</h2>
                      <h2 className="d-inline p-0 m-0">up</h2>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </nav>
          {/* ---------------------------------------------------------------------------------------------------------------------------------------------- */}

          <div className="container py-5 ">
            <div className="row gx-5 gy-5">
              {nftVerifiedProductList.map((e) => {
                return (
                  <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex align-items-stretch" key={e._id}>
                    <VerifiedProductCard eachProduct={e} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        <div className={`${customStyle['home-page-frame']} bootstrap-overrides`}>
          <nav>
            <h2>Naked & Famous</h2>
            <div className={`${customStyle['nav-item-right']}`}>
              <img onClick={login} src={metamask} alt="metamask" className={`${customStyle['meta-mask-img']}`} />
             

              <Link to={'/dashboard'} className={`link-decoration`}>
                <h2>
                  <span>Tem</span>
                  <span className={`${customStyle['i-letter']}`}>i</span>
                  <span>up</span> Station
                </h2>
              </Link>
            </div>
          </nav>
          <div className={`${customStyle['product-section']}`}>
            <div className={`${customStyle['product-grid-wrapper']}`}>
              {publicProductList.map((e) => {
                return <ProductCard key={e.id} eachProduct={e} />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
