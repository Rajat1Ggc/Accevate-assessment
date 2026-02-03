import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Image} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getDashboard} from "../api/apiClient";
import AppHeader from "../components/AppHeader";

export default function DashboardScreen({navigation}: any) {
  const [data, setData] = useState<any>(null);
  const [bgColor, setBgColor] = useState("#f2f2f2");

  const loadDashboard = async () => {
    const token = await AsyncStorage.getItem("TOKEN");
console.log("TOKEN:", token);
    if (!token) {
      Alert.alert("Error", "Token missing");
      navigation.replace("Login");
      return;
    }

    const res = await getDashboard(token);

    if (res.data.status) {
      setData(res.data);
      setBgColor(res.data.dashboard.color.dynamic_color);
    } else {
      Alert.alert("Error", res.data.msg);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const onLogout = async () => {
    await AsyncStorage.removeItem("USER_ID");
    await AsyncStorage.removeItem("TOKEN");
    navigation.replace("Login");
  };

  return (
    <>
      <AppHeader />
      <View style={[styles.container, {backgroundColor: bgColor}]}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subTitle}>Hi, {data?.user?.name || "User"}</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Carousel */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
            {data?.dashboard?.carousel?.map((img: string, index: number) => (
              <Image key={index} source={{uri: img}} style={styles.banner} />
            ))}
          </ScrollView>

          <Text style={styles.section}>Students</Text>
          <Text style={styles.text}>Boys: {data?.dashboard?.student?.Boy || 0}</Text>
          <Text style={styles.text}>Girls: {data?.dashboard?.student?.Girl || 0}</Text>
          <Text style={styles.section}>Amount</Text>
          <Text style={styles.text}>Total: ₹{data?.dashboard?.amount?.Total || 0}</Text>
          <Text style={styles.text}>Paid: ₹{data?.dashboard?.amount?.Paid || 0}</Text>
          <Text style={styles.text}>Due: ₹{data?.dashboard?.amount?.due || 0}</Text>

          <TouchableOpacity style={styles.btn} onPress={loadDashboard}>
            <Text style={styles.btnText}>Refresh</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, styles.logoutBtn]} onPress={onLogout}>
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20
  },
  title: {
    fontSize: 24, 
    fontWeight: "700", 
    color: "#fff",
    marginTop: 10
  },
  subTitle: {
    fontSize: 14, 
    color: "#fff", 
    marginBottom: 15
  },
  carousel: {
    marginBottom: 20
  },
  banner: {
    height: 140, 
    width: 280, 
    borderRadius: 10, 
    marginRight: 10
  },
  section: {
    fontSize: 18,
    fontWeight: "700", 
    color: "#fff", 
    marginTop: 15, 
    marginBottom: 8
  },
  text: {
    fontSize: 15, 
    color: "#fff",
    marginBottom: 5
  },
  btn: {
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  logoutBtn: {
    backgroundColor: "red"
  },
  btnText: {
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600"
  },
});
