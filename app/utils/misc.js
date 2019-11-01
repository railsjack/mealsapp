import {AsyncStorage} from "react-native";

import { FIREBASE_API_KEY as API_KEY } from "../constants/keys";

export const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
export const SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
export const REFRESH_URL = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;
export const USERINFO_URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;

const APP_NAME = "@mealsapp1";

export const setTokens = (values, cb) => {
  AsyncStorage.multiSet([
    [`${APP_NAME}@uid`, values.uid],
    [`${APP_NAME}@token`, values.token],
    [`${APP_NAME}@refToken`, values.refToken]
  ]).then(cb);
};

export const getTokens = (cb) => {
  AsyncStorage.multiGet([
    `${APP_NAME}@uid`,
    `${APP_NAME}@token`,
    `${APP_NAME}@refToken`
  ]).then(values => cb(values));
};

export const removeTokens = (cb) => {
  AsyncStorage.multiRemove([
    `${APP_NAME}@uid`,
    `${APP_NAME}@token`,
    `${APP_NAME}@refToken`
  ]).then(cb);
}

