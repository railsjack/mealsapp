import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = props => {
  let template = null;
  switch (props.type) {
    case "textinput":
      template = (
        <TextInput
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
    fontFamily: "open-sans",
    fontSize: 16,
    padding: 5,
    marginTop: 10,
    borderBottomColor: "#eaeaea",
    borderBottomWidth: 1
  }
});

export default Input;
