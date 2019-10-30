import React, { useState } from "react";
import { Platform, View, StyleSheet, Button, TouchableOpacity } from "react-native";

import { useDispatch } from "react-redux";

import Input from "../utils/forms/input";
import ValidationRules from "../utils/forms/validationRules";
import DefaultText from "../components/DefaultText";
import { signUp, signIn } from "../store/actions/user_actions";

import { setTokens } from "../utils/misc";

const LoginFormComponent = props => {
  state = {
    loading: true,
    formInfo: {
      type: "Login",
      action: "Login",
      actionMode: "I want to register",
      hasErrors: false
    },
    form: {
      email: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          isEmail: true
        }
      },
      password: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          minLength: 6
        }
      },
      confirmPassword: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          confirmPass: "password"
        }
      }
    }
  };
  const dispatch = useDispatch();
  const [formInfo, setFormInfo] = useState(state.formInfo);
  const [form, setForm] = useState(state.form);

  goNext = () => {
    props.navigation.navigate("Main");
  };

  changeFormType = () => {
    const { type } = formInfo;
    const formInfoCopy = { ...formInfo };
    formInfoCopy["type"] = type === "Login" ? "Register" : "Login";
    formInfoCopy["action"] = type === "Login" ? "Register" : "Login";
    formInfoCopy["actionMode"] =
      type === "Login" ? "I want to login" : "I want to register";
    setFormInfo(formInfoCopy);
  };

  updateInput = (name, value) => {
    setFormInfo({ ...formInfo, ...{ hasErrors: false } });

    const formCopy = { ...form };
    formCopy[name].value = value;
    formCopy[name].valid = ValidationRules(
      value,
      formCopy[name].rules,
      formCopy
    );
    setForm(formCopy);
  };

  manageAccess = () => {
    if (!props.User.auth || props.User.auth.uid === false) {
      setFormInfo({ ...formInfo, ...{ hasErrors: true } });
    } else {
      setTokens(props.User.auth, () => {
        goNext();
      });
    }
  };

  submitUser = () => {
    let formToSubmit = {};
    let isFormValid = true;
    for (let key in form) {
      if (formInfo.type === "Login") {
        if (key !== "confirmPassword") {
          isFormValid = isFormValid && form[key].valid;
          formToSubmit[key] = form[key].value;
        }
      } else {
        isFormValid = isFormValid && form[key].valid;
        formToSubmit[key] = form[key].value;
      }
    }

    if (!isFormValid) {
      setFormInfo({ ...formInfo, ...{ hasErrors: true } });
    } else {
      if (formInfo.type === "Register") {
        dispatch(signUp(formToSubmit)).then(() => {
          manageAccess();
        });
      }
      if (formInfo.type === "Login") {
        dispatch(signIn(formToSubmit)).then(() => {
          manageAccess();
        });
      }
    }
  };

  hideErrors = () => {
    setFormInfo({ ...formInfo, ...{ hasErrors: false } });
  }

  return (
    <View style={[styles.container, props.overrideStyle]}>
      <Input
        placeholder="Enter your email"
        type={form.email.type}
        value={form.email.value}
        keyboardType={"email-address"}
        onChangeText={value => updateInput("email", value)}
      />
      <Input
        placeholder="Enter your password"
        type={form.password.type}
        value={form.password.value}
        onChangeText={value => updateInput("password", value)}
        secureTextEntry
      />
      {formInfo.type === "Register" && (
        <Input
          placeholder="Enter confirm password"
          type={form.confirmPassword.type}
          value={form.confirmPassword.value}
          onChangeText={value => updateInput("confirmPassword", value)}
          secureTextEntry
        />
      )}
      {formInfo.hasErrors && (
        <TouchableOpacity
          onPress={hideErrors}
         style={styles.errorContainer}>
          <DefaultText style={styles.errorLabel}>
            Oops, check your info
          </DefaultText>
        </TouchableOpacity>
      )}
      <View style={{ marginTop: 20 }}>
        <View style={styles.button}>
          <Button title={formInfo.action} onPress={submitUser} />
        </View>
        <View style={styles.button}>
          <Button title={formInfo.actionMode} onPress={changeFormType} />
        </View>
        <View style={styles.button}>
          <Button title="I'll do it later" onPress={() => goNext()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  errorContainer: {
    marginBottom: 10,
    marginTop: 30,
    padding: 10,
    backgroundColor: "#f44336"
  },
  errorLabel: {
    color: "#fff",
    textAlignVertical: "center",
    textAlign: "center"
  },
  button: {
    ...Platform.select({
      ios: {
        marginBottom: 0
      },
      android: {
        marginTop: 7,
        marginBottom: 7
      }
    })
  }
});

export default LoginFormComponent;
