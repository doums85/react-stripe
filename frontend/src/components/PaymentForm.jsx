import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  async function submitHandler(e) {
    e.preventDefault();
    console.log('====================================');
    console.log('Requested payment method');
    console.log('====================================');
   /*  const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;

        const response = await axios.post('/api/payment', {
          amount: 1000,
          id,
        });
 
        if (response.data.success) {
          console.log('Successfully payment');
          setSuccess(true);
        }
      } catch (error) {
        console.log('error', error);
      }
    } else {
      console.log(error.message);
    } */
  }

  return (
    <>
      {!success ? (
        <form className="form" onSubmit={submitHandler}>
          <fieldset className="form__group">
            <div>
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button className="form__button">Pay</button>
        </form>
      ) : (
        <div>
          <h2>Lorem ipsum dolor sit amet.</h2>
        </div>
      )}
    </>
  );
}
