import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.head}>Hello</Text>
      <Text style={styles.main}>Main contain</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    color: "white",
    fontSize: 30,
    backgroundColor: "#2B2D42",
    height: 300,
    padding: 50,
  },
  main: {
    color: "black",
    fontSize: 20,
    backgroundColor: "#EDF2F4",
    padding: 50,
  },
});

export default HomeScreen;
