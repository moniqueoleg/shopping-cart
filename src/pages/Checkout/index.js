// import { useState } from 'react';

import { Link } from 'react-router-dom';

import { useCheckoutContext } from 'hooks/useCheckoutContext';

import CheckoutProgression from './CheckoutProgression';
import CheckoutSummary from './CheckoutSummary';
import Info from './ShippingInfo';
import Shipping from './ShippingOption';
import Payment from './Payment';
import OrderSummary from './OrderSummary';

import Loader from 'common/Loader';

import logo from 'assets/images/checkout-logo-nav.png';

import styles from './index.module.scss';

const progressionSteps = [
  { id: 'cart', label: 'Carrito', url: '/carrito' },
  { id: 'info', label: 'Info' },
  { id: 'shipping', label: 'Envío' },
  { id: 'payment', label: 'Pago' },
];

const Checkout = () => {
  const { checkoutIsReady, currentStep } = useCheckoutContext();

  let formContent;

  if (progressionSteps[currentStep].id === 'info') {
    formContent = <Info />;
  }

  if (progressionSteps[currentStep].id === 'shipping') {
    formContent = (
      <>
        <CheckoutSummary
          id={'shipping'}
          // currentStep={currentStep}
          // handleSelectStep={handleSelectStep}
        />
        <Shipping
        // handlePreviousStep={handlePreviousStep}
        // handleNextStep={handleNextStep}
        />
      </>
    );
  }

  if (progressionSteps[currentStep].id === 'payment') {
    formContent = (
      <>
        <CheckoutSummary
          id={'payment'}
          // currentStep={currentStep}
          // handleSelectStep={handleSelectStep}
        />
        <Payment
        // handlePreviousStep={handlePreviousStep}
        />
      </>
    );
  }

  return (
    <>
      <div className={styles.background}></div>
      <section className={styles.layout}>
        <>
          {!checkoutIsReady && <Loader noPortal={true} />}
          {checkoutIsReady && (
            <>
              <div className={`${styles.header} main-container`}>
                <Link to="/">
                  <img className={styles.logo} src={logo} alt="" />
                </Link>
              </div>
              <div className={`${styles.content_wrapper} main-container`}>
                <div className={styles.info_container}>
                  <div className={styles.info_header}>
                    <Link to="/">
                      <img className={styles.logo} src={logo} alt="" />
                    </Link>
                  </div>
                  <CheckoutProgression steps={progressionSteps} />
                  {formContent}
                </div>
                <div className={styles.order_summary_container}>
                  <OrderSummary />
                </div>
              </div>
            </>
          )}
        </>
      </section>
    </>
  );
};

export default Checkout;
