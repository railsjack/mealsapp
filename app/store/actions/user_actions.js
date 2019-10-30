import axios from "axios";

import { SIGN_UP, SIGN_IN } from "../types";
import { SIGNUP_URL, SIGNIN_URL } from "../../utils/misc";

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


