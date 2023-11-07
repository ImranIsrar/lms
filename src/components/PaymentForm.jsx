
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

import checkoutPayment from '../Services/Payment';
// import useSavedUser from '../hooks/SavedUser';



const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#098b99",
      color: "#0d0c0c",
      fontWeight: 500,
      fontFamily: "'Josefin Sans', sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      backgroundColor: "#f2f0ef",
      lineHeight: "55px",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": {
        color: "#757575",
        textTransform: "capitalize",
        fontFamily: "'Josefin Sans', sans-serif"
      }
    },
    invalid: {
      iconColor: "#FF0100",
      color: "#FF5556",
      fontFamily: "'Josefin Sans', sans-serif",
    }
  }
}

const PaymentForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // const loginUser = useSavedUser('authUser');
  const data = secureLocalStorage.getItem('authUser');
  const loginUser = (data && data !== 'undefined' && data != undefined) ? JSON.parse(data) : null;

  const { totalPrice, cart } = useSelector((state) => state.app);
  const [success, setSuccess] = useState(false);


  const cartProduct = [];
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Stripe.js has not loaded yet. Make sure to disable
    if (!stripe || !elements) return;

    // Get Cart Element
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });
    const { id } = paymentMethod;

    if (!error) {
      try {

        // Get All Cart Product ID's
        cart && cart.map((item) => cartProduct.push(item.id));

        // Set All Product Info
        const paymentData = {
          id: id,
          userId: loginUser?.id,
          amount: totalPrice * 100,
          productName: cartProduct
        }
        console.log('paymentData', paymentData);

        checkoutPayment.payment(paymentData)
        .then((res) => {
          console.log('response>>>', res);
          if(res.data) {

            setSuccess(true);
            toast.success("Successful Payment");
            navigate('/my-courses', { replace: true });
          }
        })
        .catch((err) => {
          toast.error("Failed: Please Enter Valid Information.");
        })
        // const response = await axios.post("http://localhost:4000/payment", paymentData);
        // console.log('response>>>', response);
      } catch (error) {
        console.log("Error >>>", error);
        toast.error(error)
      }
    } else {
      toast.error(error.message)
    }
  }
  return (
    <>
      {
        !stripe || !elements ? (
          <div className="loadingbar">
            <div className="bar" role="bar" 
              style={{ transform: 'translate3d(-88.5321%, 0px, 0px)', transition: 'all 200ms ease 0s' }}>
              <div className="peg" />
            </div>

            <div className="spinner" role="spinner">
              <div className="spinner-icon" />
            </div>
          </div>
        ) : (
          <form className="payment-form" onSubmit={handleSubmit}>
            <fieldset className='FormGroup'>
              <div className="FormRow">
                <CardElement options={CARD_OPTIONS} />
              </div >
            </fieldset >

            <button type="submit" className="btn default-btn d-block w-100"
              disabled={!stripe || !elements}
            >
              Place Order
            </button>
          </form >
        )
      }

    </>
  )
}

export default PaymentForm
