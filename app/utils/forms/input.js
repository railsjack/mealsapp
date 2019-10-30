import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = props => {
  let template = null;
  switch (props.type) {
    case "textinput":
      template = (
        <TextInput
          placeholderTextColor="#222"
          underlineColorAndroid="transparent"
          {...props}
          style={[styles.input, props.overrideStyle]}
        />
      );
      break;
    default:
      return template;
  }
  return template;
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    fontFamily: "open-sans-bold",
    fontSize: 20,
    letterSpacing: 1,
    padding: 5,
    marginTop: 10,
    borderBottomColor: 'rgba(128,128,128,0.4)',
    borderBottomWidth: 1,
    borderRadius: 4,
    backgroundColor: 'rgba(196,196,196,0.1)'
  }
});

export default Input;
