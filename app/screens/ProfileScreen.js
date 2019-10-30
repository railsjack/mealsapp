import React, { Component } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View
} from "react-native";
import Moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserInfo } from "../store/actions/user_actions";
import { getTokens, removeTokens } from "../utils/misc";

import HeaderButton from "../components/HeaderButton";

class ProfileScreen extends Component {
  static navigationOptions(navData) {
    return {
      headerTitle: "Profile",
      headerLeft: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      )
    };
  }

  state = {
    loading: true,
    logged_in: true
  };
  componentDidMount() {
    getTokens(value => {
      if (value[1][1] === null) {
        this.setState({ loading: false, logged_in: false });
      } else {
        this.props.getUserInfo(value[1][1]).then(() => {
          this.setState({ loading: false });
        });
      }
    });
  }

  logOut = () => {
    this.setState({ loading: true });
    removeTokens(() => {
      setTimeout(() => {
        this.props.navigation.navigate("Auth");
      }, 1500);
    });
  };

  showUserInfo = () => {
    const { user_info } = this.props.User;
    return this.state.loading ? (
      <ActivityIndicator style={{ marginTop: 20 }} />
    ) : this.state.logged_in ? (
      <>
        <View style={styles.itemContainer}>
          <Text style={styles.itemLabel}>Name</Text>
          <Text style={styles.itemValue}>{user_info.displayName}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemLabel}>Email</Text>
          <Text style={styles.itemValue}>{user_info.email}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemLabel}>Created at</Text>
          <Text style={styles.itemValue}>
            {Moment(user_info.createdAt * 1).format("MMM D, YYYY")}
          </Text>
        </View>
        <View style={styles.itemContainer2}>
          <Button title="Logout" onPress={this.logOut} />
        </View>
      </>
    ) : (
      <>
        <View style={styles.itemContainer2}>
          <Text style={styles.itemValue}>
            This screen is available only when you log in / register
          </Text>
        </View>
        <View style={styles.itemContainer2}>
          <Button
            title="Login / Register"
            onPress={() => this.props.navigation.navigate("Auth")}
          />
        </View>
      </>
    );
  };

  render() {
    return <View style={styles.profileContainer}>{this.showUserInfo()}</View>;
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingTop: 20
  },
  itemContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    backgroundColor: "#f2f2f2",
    width: "80%",
    borderRadius: 3,
    padding: 10
  },
  itemContainer2: {
    marginTop: 20,
    width: "80%"
  },
  itemLabel: {
    fontSize: 11,
    fontFamily: "open-sans-bold"
  },
  itemValue: {
    fontSize: 16,
    fontFamily: "open-sans"
  }
});

function mapStateToProps(state) {
  console.log("state.User: ", state.User);
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserInfo }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
