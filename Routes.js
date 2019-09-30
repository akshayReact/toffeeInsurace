
import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "./src/Screens/Login";
import WelcomeScreen from "./src/Screens/WelcomeScreen";
import SignUp from "./src/Screens/SignUp";
import HomeScreen from "./src/Screens/HomeScreen";
import PostScreen from "./src/Screens/postScreen";

const AppNavigator = createStackNavigator({
  welcomeScreen: WelcomeScreen,
  login:Login,
  homeScreen:HomeScreen,
  signupScreen:SignUp,
  post:PostScreen
},{
    defaultNavigationOptions: {
      header: null
    },
});

const AppRoutes=createAppContainer(AppNavigator)
export default AppRoutes;