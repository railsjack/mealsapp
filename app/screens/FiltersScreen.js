import React, { useState } from "react";
import { Platform, StyleSheet, Switch, Text, View } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

import Colors from "../constants/colors";

const FilterSwitch = props => (
  <View style={styles.filterContainer}>
    <Text>{props.label}</Text>
    <Switch
      value={props.state}
      onValueChange={props.onChange}
      trackColor={{ true: Colors.primaryColor }}
      thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
    />
  </View>
);

const FiltersScreen = props => {
  const [isGluetenFree, setIsGluetenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Glueten-Free"
        state={isGluetenFree}
        onChange={newValue => setIsGluetenFree(newValue)}
      />
      <FilterSwitch
        label="LactoseFree-Free"
        state={isLactoseFree}
        onChange={newValue => setIsLactoseFree(newValue)}
      />
      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={newValue => setIsVegan(newValue)}
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={newValue => setIsVegetarian(newValue)}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = navData => {
  return {
    headerTitle: "Filter Meals",
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
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontFamily: "open-sans",
    fontSize: 20,
    margin: 20,
    textAlign: "center"
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 7
  }
});

export default FiltersScreen;
