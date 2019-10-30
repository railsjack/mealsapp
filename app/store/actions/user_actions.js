import axios from "axios";

import { SIGN_UP, SIGN_IN, AUTO_SIGN_IN, GET_USER_INFO } from "../types";
import { SIGNUP_URL, SIGNIN_URL, REFRESH_URL, USERINFO_URL } from "../../utils/misc";

export const signUp = data => {
  const request = axios({
    url: SIGNUP_URL,
    method: "POST",
    header: {
      "Content-Type": "application/json"
    },
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return false;
    });
  return {
    type: SIGN_UP,
    payload: request
  };
};


export const signIn = data => {
  const request = axios({
    url: SIGNIN_URL,
    method: "POST",
    header: {
      "Content-Type": "application/json"
    },
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return false;
    });
  return {
    type: SIGN_IN,
    payload: request
  };
};


export const autoSignIn = refToken => {
  const request = axios({
    url: REFRESH_URL,
    method: "POST",
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: "grant_type=refresh_token&refresh_token="+refToken
  })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return false;
    });
  return {
    type: AUTO_SIGN_IN,
    payload: request
  };
};



export const getUserInfo = idToken => {
  const request = axios({
    method: 'POST',
    url: USERINFO_URL,
    data: { idToken },
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return {
        user_info: response.data && response.data.users && response.data.users[0]
      };
    })
    .catch(e => {
      return false;
    });
  return {
    type: GET_USER_INFO,
    payload: request,
  };
};

