# How to build a mobile app using React-Native & Expo

## Initial commit
```
$ yarn global add create-react-native-app
$ mkdir mealsapp && cd mealsapp
$ create-react-native-app .
```

## How to load font assets
> *First of all, you need to copy the necessay font files to assets directory.*
```
$ yarn add expo-font
# Or `expo install expo-font` to guarantee you're installing the right version  
  of the package for your Expo version.
```
```
import React, {useState} from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});
}

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);
	if (!fontLoaded) {
		return (
			<AppLoading startAsync={fetchFonts} 
			onFinished={()=>setFontLoaded(true)} />
		);
	}
	return (
		<View>
			<Text>Hello</Text>
		</View>
	);
}

```

## How to use FlatList
models/category.js
```
class Category{
	constructor(id, title, color) {
		this.id = id;
		this.title = title;
		this.color = color;
	}
}
export default Category;
```

data/dummy-data.js  
```
import Category from '../models/category';
export const CATEGORIES = [
	new Category('c1', 'Italian', '#f5428d'),
	...
];
```

```
import {CATEGORIES} from '../data/dummy-data';

const renderGridItem = itemData => {
	return (
		<View style={styles.gridItem}>
			<Text>{itemData.item.title}</Text>
		</View>
	);
}

<FlatList keyExtractor={(item, index)=>item.id} data={CATEGORIES} renderItem={renderGridItem} numColumns{2} />

gridItem: {
	flex: 1,
	margin: 15,
	height: 150
}
```

## How to handle header Options
This is based on the fact that each screen is just a javascript function and   
it can have a property like as **navigationOptions**, so that we can inject   
any custom options for the screen of the navigation.

For example
```
const CategoriesScreen = props => {
  return (
	<View>
	...
	</View>
  );
};
CategoriesScreen.navigationOptions = {
	headerTitle: 'Custom title',
	headerStyle: {
		...
	}
}
```
Another way
```
CategoriesScreen.navigationOptions = navigationData => {
	const title = navigationData.navigation.getParam('title);
	return {
		headerTitle: title
	}
}
```

## Using react-native-screens
```
import {useScreens} from 'react-native-screens';
useScreens();
```
