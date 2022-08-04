import React from 'react';

export default function VerifiedProductCard({ eachProduct }) {
  return (
    <div className={`card p-3 radius-custom ${eachProduct.type === 'Exclusive' ? 'border-warning' : 'border-info'}`}>
      {/* product image ------------------------------------------------------------------------------------------------------------------------------------- */}
      <div className={`radius-custom`}>
        <img src={eachProduct.path} className={`card-img-top radius-custom img-custom`} alt="img" />
      </div>

      <div className={`card-body p-0 mt-2`}>
        {/* product name --------------------------------------------------------------------------------------------------------------------------------- */}

        <h6 className="card-title m-0 fw-bold">{eachProduct.productName.length >= 60 ? eachProduct.productName.substring(0, 59) + ' ...' : eachProduct.productName}</h6>

        {/* product price  ---------------------------------------------------------------------------------------------------------------------------------*/}

        <div className="mt-1 d-flex align-items-center justify-content-between p-0">
          <div>
            <h5 className="d-inline fw-bold">${Math.round(eachProduct.price * (1 - 0.4), 2)}</h5>
            <h6 className="d-inline text-decoration-line-through ms-3 text-light">${eachProduct.price}</h6>
          </div>
          <div>
            <h6 className="p-0 m-0">{eachProduct.type}</h6>
          </div>
        </div>

        {/* join team button ---------------------------------------------------------------------------------------------------------------------------------------- */}

        <button className={`btn btn-info mt-3 w-100 radius-custom`}>
          <h5 className={`m-0`}>Buy now</h5>
        </button>
      </div>
    </div>
  );
}
