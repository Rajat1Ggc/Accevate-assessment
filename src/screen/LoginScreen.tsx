import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {login} from "../api/apiClient";

export default function LoginScreen({navigation}: any) {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    if (!userid || !password) {
      Alert.alert("Error", "Enter userid and password");
      return;
    }

    const res = await login(userid, password);

    if (res.data.status) {
      await AsyncStorage.setItem("USER_ID", String(res.data.userid));
      navigation.replace("Otp");
    } else {
      Alert.alert("Login Failed", res.data.msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="UserId"
        value={userid}
        onChangeText={setUserid}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.btn} onPress={onLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20, 
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 22, 
    fontWeight: "700",
    textAlign: "center",  
    marginBottom: 20
  },
  input: {
    borderWidth: 1, 
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8, 
    marginBottom: 12
  },
  btn: {
    backgroundColor: "#111", 
    padding: 14, 
    borderRadius: 8, 
    alignItems: "center"
  },
  btnText: {
    color: "#fff", 
    fontSize: 16,
    fontWeight: "600"
  },
});
