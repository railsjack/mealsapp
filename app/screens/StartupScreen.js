import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTokens, setTokens } from "../utils/misc";
import { autoSignIn } from "../store/actions/user_actions";

class StartupScreen extends Component {
  constructor(props) {
    super(props);
  }

  manageAccess = () => {
    const { User } = this.props;
    console.log("manageAccess", User);
    if (User && User.auth && User.auth.uid) {
      setTokens(User.auth, () => {
        this.props.navigation.navigate("Main");
      });
    } else {
      this.props.navigation.navigate("Auth");
    }
  };

  componentDidMount() {
    getTokens(values => {
      if (values && values[2][1]) {
        const refToken = values[2][1];
        this.props.autoSignIn(refToken).then(() => {
          console.log("after checking refToken", this.props.User);
          this.manageAccess();
        });
      } else {
        this.props.navigation.navigate("Auth");
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

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
)(StartupScreen);
