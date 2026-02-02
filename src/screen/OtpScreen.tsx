import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Alert, TextInput} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {verifyOtp} from "../api/apiClient";

export default function OtpScreen({navigation}: any) {
  const [userId, setUserId] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const load = async () => {
      const id = await AsyncStorage.getItem("USER_ID");
      if (id) setUserId(id);
    };
    load();
  }, []);

  const onVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert("Error", "Enter 6 digit OTP");
      return;
    }

    const res = await verifyOtp(userId, otp);

    if (res.data.status) {
      await AsyncStorage.setItem("TOKEN", res.data.token);
      navigation.replace("Dashboard");
    } else {
      Alert.alert("OTP Failed", res.data.msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <TextInput
        placeholder="Enter OTP"
        value={otp}
        placeholderTextColor={"#000"}
        onChangeText={(t) => setOtp(t.replace(/[^0-9]/g, ""))}
        keyboardType="number-pad"
        maxLength={6}
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={onVerify}>
        <Text style={styles.btnText}>Verify</Text>
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
    textAlign: "center",
    letterSpacing: 8,
    marginBottom: 12,
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
