import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import Logo from "../components/Logo";
import LoginForm from "../components/LoginForm";

import { connect } from "react-redux";

const LoginScreen = props => {
  return (
    <ScrollView style={styles.container}>
      <Logo />
      <LoginForm navigation={props.navigation} User={props.User} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 50
  }
});

const mapStateToProps = state => {
  console.log("state.User", state.User);
  return {
    User: state.User
  };
};

export default connect(mapStateToProps)(LoginScreen);
