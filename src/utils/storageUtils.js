import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorage = async name => {
  const data = await AsyncStorage.getItem(name);
  return data;
};
export const setStorage = async (name, value) =>
  await AsyncStorage.getItem(name, JSON.stringify(value));

export const removeStorage = async name => AsyncStorage.removeItem(name);
