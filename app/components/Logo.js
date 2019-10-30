import React from "react";

import { Image } from "react-native";

import LogoImage from "../../assets/images/meal-app-logo.jpg";

const LogoComponent = props => {
  return (
    <Image
      source={LogoImage}
      resizeMode={"cover"}
      style={{
        width: '100%'
      }}
    />
  );
};

export default LogoComponent;
