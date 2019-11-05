import React from "react";
import { ActivityIndicator, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { getTokens, setTokens } from "../utils/misc";
import { autoSignIn } from "../store/actions/user_actions";

const StartupScreen = props => {
  const dispatch = useDispatch();
  const User = useSelector(state => state.User);

  if (User && User.auth && User.auth.uid) {
    const tryGoToMain = async () => {
      await setTokens(User.auth, () => {
        props.navigation.navigate("Main");
      });
    };
    tryGoToMain();
    return null;
  } else {
    const tryToAuth = async () => {
      await getTokens(values => {
        if (values && values[2][1]) {
          const refToken = values[2][1];
          dispatch(autoSignIn(refToken));
        } else {
          props.navigation.navigate("Auth");
        }
      });
    };
    tryToAuth();
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
};

export default StartupScreen;
