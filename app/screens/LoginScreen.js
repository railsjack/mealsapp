import React from "react";
import {connect} from 'react-redux'
import { StyleSheet, ImageBackground, View } from "react-native";

import Logo from "../components/Logo";
import LoginForm from "../components/LoginForm";

const LoginScreen = props => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../../assets/images/food-bg.jpg")}
      style={styles.container}
    >
      <View
        style={{
          width: "100%",
          padding: 20,
          marginTop: 100,
          borderRadius: 15,
          shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 1 },
          shadowRadius: 5,
          elevation: 1,
          backgroundColor: "rgba(255,255,255,0.4)"
        }}
      >
        <Logo
          overrideStyle={{
            marginBottom: 0
          }}
        />
        <LoginForm navigation={props.navigation} User={props.User} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  loading: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    User: state.User
  }
}
export default connect(mapStateToProps)(LoginScreen);
