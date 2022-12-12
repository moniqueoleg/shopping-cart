import { useReducer, useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth } from '../../firebase/config';
import { db } from '../../firebase/config';

import AuthContext from './auth-provider';

const initialState = {
  user: null,
  name: null,
  lastName: null,
  email: null,
  phone: null,
  cartId: null,
  ordersId: null,
  checkoutSessionId: null,
  authIsReady: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_IS_READY': {
      return {
        user: action.payload.user,
        name: action.payload.name,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phone: action.payload.phone,
        cartId: action.payload.cartId,
        ordersId: action.payload.ordersId,
        checkoutSessionId: action.payload.checkoutSessionId,
        authIsReady: true,
      };
    }
    case 'LOGIN': {
      return {
        ...state,
        user: action.payload.user,
        name: action.payload.name,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phone: action.payload.phone,
        cartId: action.payload.cartId,
        ordersId: action.payload.ordersId,
        checkoutSessionId: action.payload.checkoutSessionId,
      };
    }
    case 'LOGOUT': {
      return {
        ...initialState,
        authIsReady: true,
      };
    }
    case 'NEW_CHECKOUT_SESSION_ID': {
      return {
        ...state,
        checkoutSessionId: action.payload,
      };
    }
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        const userData = userDoc.data();

        dispatch({
          type: 'AUTH_IS_READY',
          payload: { user, ...userData },
        });
      } else {
        dispatch({
          type: 'AUTH_IS_READY',
          payload: {},
        });
      }
    });

    return () => unsub();
  }, []);

  console.log('auth-context', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;