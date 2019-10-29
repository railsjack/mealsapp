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