import * as React from "react";
import { useColorScheme } from "react-native"
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListScreen, ImageViewScreen } from "./screens"

import Colors from "./constants/Colors";
import "react-native-reanimated";

const queryClient = new QueryClient()

export type RootStackParamList = {
  ListScreen: undefined;
  ImageViewScreen: { imageUrl: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? Colors.bermudaGray : Colors.white,
          },
          headerTitleStyle: {
            color: isDarkMode ? Colors.white : Colors.bermudaGray,
          },
          headerTintColor: isDarkMode ? Colors.white : Colors.bermudaGray,
        }}>
          <Stack.Screen name="ListScreen" options={{ title: "Image List" }} component={ListScreen} />
          <Stack.Screen name="ImageViewScreen" options={{ title: "Image View" }} component={ImageViewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;