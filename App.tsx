import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import Header from "./src/components/Header";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { COLORS } from "./src/constants/colors";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { RootSiblingParent } from "react-native-root-siblings";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) return null;

  return (
    <RootSiblingParent>
      <AuthProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </AuthProvider>
    </RootSiblingParent>
  );
}

const RootNavigator = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <AppNavigator /> : <AuthNavigator />;
};
