import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { CATEGORIES } from "../data/dummy-data";

const renderGridItem = itemData => (
  <View style={styles.gridItem}>
    <Text>{itemData.item.title}</Text>
  </View>
);

const CategoriesScreen = props => {
  return (
    <FlatList
      keyExtractor={(item, key) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 10,
    height: 150
  }
});

export default CategoriesScreen;
