import {FIREBASE_API_KEY as API_KEY} from '../constants/keys';

export const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
export const SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
export const REFRESH_URL = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

