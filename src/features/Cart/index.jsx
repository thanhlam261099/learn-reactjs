import React from 'react';
import { useSelector } from 'react-redux';
import { cartTotalSelector } from './selectors';

CartFeature.propTypes = {
  
};

function CartFeature(props) {
  const cartTotal = useSelector(cartTotalSelector)
  return (
    <div>
      {`Total price: ${cartTotal}`}
    </div>
  );
}

export default CartFeature;