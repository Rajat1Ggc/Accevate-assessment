import React from "react";
import {View, Image, StyleSheet} from "react-native";

export default function AppHeader() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    paddingTop: 15,
    paddingBottom: 8, 
    alignItems: 'flex-start', 
    backgroundColor: "#fff"
  },
  logo: {
    height: 55, 
    width: 180
  },
});
