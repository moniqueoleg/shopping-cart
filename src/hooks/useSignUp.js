import { useState } from 'react';

import { v4 as uuid } from 'uuid';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth } from '../firebase/config';
import { db } from '../firebase/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

export const useSignUp = () => {
  const { dispatch } = useAuthContext();
  const { id: cartId } = useCartContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async ({ name, lastName, email, password }) => {
    setError(null);
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential) {
        throw new Error('No se pudo crear la cuenta');
      }

      const user = userCredential.user;

      let userCartId;

      if (cartId) {
        userCartId = cartId;
        localStorage.removeItem('CART_IN_STORAGE');
      } else {
        userCartId = uuid();
      }

      const userData = {
        name,
        lastName,
        email,
        cartId: userCartId,
        ordersId: uuid(),
        checkoutSessionId: uuid(),
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      dispatch({ type: 'LOGIN', payload: { user, ...userData } });
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { signUp, error, isLoading };
};