
import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';


const StripeContainer = () => {

  const PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
  const stripeTestPromise = loadStripe(PUBLIC_KEY);
  console.log('StripeContainer');

  return (
    <>
      <Elements stripe={stripeTestPromise}>
        <PaymentForm />
      </Elements>
    </>
  )
}

export default StripeContainer
