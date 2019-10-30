import React from "react";

import { ImageBackground } from "react-native";

import LogoImage from "../../assets/images/meal-app-logo.jpg";
import DefaultText from "../components/DefaultText";

const LogoComponent = props => {
  return (
    <ImageBackground
      resizeMode={"cover"}
      style={[
        {
          width: "100%"
        },
        props.overrideStyle
      ]}
    >
      <DefaultText
        style={{
          fontFamily: 'srisakdi-bold',
          fontSize: 50,
          textAlign: "center",
          padding: 7,
          borderRadius: 20,
          color: '#222',
          // backgroundColor: "rgba(255,255,255, 0.4)"
        }}
      >
        My Meals
      </DefaultText>
    </ImageBackground>
  );
};

export default LogoComponent;
