import React from 'react'

const Checkout = ({order}) => {

    

  return (
   
    <div className="container mb-5">
    <main>
      <div className="py-5 text-center">
        <h2>Checkout</h2>
      </div>
  
      <div className="row g-3">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge bg-secondary rounded-pill">{order.total_items}</span>
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Total</h6>
                <small className="text-muted">Cart Items</small>
              </div>
              <span className="text-muted">${order.total_cost}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <small className="text-muted">Shipping Charges</small>
              </div>
              <span className="text-muted">${order.shipping_charges}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <small className="text-muted">Discount </small>
              </div>
              <span className="text-muted">-${order.total_cost*order.discount_in_percent/100}</span>
            </li>
           
           
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>${order.total_cost - order.total_cost*order.discount_in_percent/100 + order.shipping_charges}</strong>
            </li>
          </ul>
      
            </div>
            
          </div>
        </main>
    
      </div>

  )
}

export default Checkout