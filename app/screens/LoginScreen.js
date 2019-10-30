import React, { Component, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  View
} from "react-native";
import { connect, useDispatch } from "react-redux";

import Logo from "../components/Logo";
import LoginForm from "../components/LoginForm";
import { autoSignIn } from "../store/actions/user_actions";
import { getTokens, setTokens } from "../utils/misc";
import { bindActionCreators } from "redux";

class LoginScreen extends Component {
  state = {
    isLoading: true
  };

  constructor(props) {
    super(props);
  }
  // const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(state.isLoading);

  goNext = () => {
    this.props.navigation.navigate("Main");
  };

  // console.log('call LoginScreen', state.isLoading);

  componentDidMount() {
    // const dispatch = useDispatch();
    getTokens(values => {
      if (values && values[2][1]) {
        const refToken = values[2][1];
        this.props.autoSignIn(refToken).then(() => {
          if (!this.props.User.auth || this.props.User.auth.uid === false) {
            this.setState({ isLoading: false });
          } else {
            setTokens(this.props.User.auth, () => {
              this.goNext();
            });
          }
        });
      } else {
        this.setState({ isLoading: false });
      }
    });
  }

  render() {
    return this.state.isLoading ? (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    ) : (
      <ImageBackground
        resizeMode="cover"
        source={require("../../assets/images/food-bg.jpg")}
        style={styles.container}
      >
        <View style={{ 
          width: '100%',
          padding: 20,
          marginTop: 100,
          borderRadius: 15,
          shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 1 },
          shadowRadius: 5,
          elevation: 1,
          backgroundColor: "rgba(255,255,255,0.4)" }}>
          <Logo
            overrideStyle={{
              marginBottom: 0
            }}
          />
          <LoginForm
            navigation={this.props.navigation}
            User={this.props.User}
          />
        </View>
      </ImageBackground>
    );
  }
}

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
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ autoSignIn }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
