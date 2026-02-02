import React, {useEffect, useState} from "react";
import {View, ActivityIndicator} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "../screen/LoginScreen";
import OtpScreen from "../screen/OtpScreen";
import DashboardScreen from "../screen/DashboardScreen";

export type RootStackParamList = {
  Login: undefined;
  Otp: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);

  useEffect(() => {
    const check = async () => {
      const token = await AsyncStorage.getItem("TOKEN");
      setInitialRoute(token ? "Dashboard" : "Login");
    };
    check();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}
