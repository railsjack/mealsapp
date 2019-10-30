import React from "react";

import { Image } from "react-native";

import LogoImage from "../../assets/images/meal-app-logo.jpg";

const LogoComponent = props => {
  return (
    <Image
      source={LogoImage}
      resizeMode={"contain"}
      style={{
        height: 120
      }}
    />
  );
};

export default LogoComponent;