import React from "react";
import { FlatList } from "react-native";

import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const CategoriesScreen = props => {
  const renderGridItem = itemData => (
    <CategoryGridTile
      title={itemData.item.title}
      color={itemData.item.color}
      imageUrl={itemData.item.imageUrl}
      onSelect={() => {
        props.navigation.navigate({
          routeName: "CategoryMeals",
          params: {
            categoryId: itemData.item.id
          }
        });
      }}
    />
  );

  return (
    <FlatList
      keyExtractor={(item, key) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

CategoriesScreen.navigationOptions = navData => {
  return {
    headerTitle: "Meal Categories",
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

export default CategoriesScreen;
