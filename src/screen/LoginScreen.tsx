import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {login} from "../api/apiClient";

export default function LoginScreen({navigation}: any) {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

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
        placeholderTextColor={"#000"}
        onChangeText={setUserid}
        style={styles.input}
      />

      <View style={styles.passBox}>
        <TextInput
          placeholder="Password"
          value={password}
          placeholderTextColor={"#000"}
          onChangeText={setPassword}
          style={styles.passInput}
          secureTextEntry={!showPass}
        />

        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <Text style={styles.showText}>{showPass ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

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
    marginBottom: 12,
    color: "#000"
  },
  passBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    color: "#000"
  },
  passInput: {
    flex: 1, 
    paddingVertical: 12,
    color: "#000"
  },
  showText: {
    fontWeight: "600", 
    color: "#111", 
    paddingLeft: 10
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
