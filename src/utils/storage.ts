import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserId = async (userId: string) => {
  await AsyncStorage.setItem("USER_ID", String(userId));
};

export const getUserId = async () => {
  return AsyncStorage.getItem("USER_ID");
};

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem("TOKEN", String(token));
};

export const getToken = async () => {
  return AsyncStorage.getItem("TOKEN");
};

export const clearAuth = async () => {
  await AsyncStorage.removeItem("USER_ID");
  await AsyncStorage.removeItem("TOKEN");
};
