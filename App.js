import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createDrawerNavigator } from '@react-navigation/drawer';
import AddExpenseScreen from "./screens/AddExpenseScreen";
import PrevDataScreen from "./screens/PrevDataScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Tab.Navigator
        screenOptions={       
          ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Add") {
              iconName = focused ? "add" : "add-outline";
            } else if (route.name === "Data") {
              iconName = focused ? "bar-chart" : "bar-chart-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: "#EDF2F4",
          tabBarInactiveTintColor: "#8D99AE",
          tabBarStyle: {
            backgroundColor: "#2B2D42",
          },
          headerShown: false,

        })}
        
      >
        {/* <Tab.Screen name="Home" component={HomeScreen} screenOptions={{}} /> */}
        <Tab.Screen name="Add" component={AddExpenseScreen} />
        <Tab.Screen name="Data" component={PrevDataScreen} />
        {/* <Tab.Screen name="Profile" component={UserProfileScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );

}
