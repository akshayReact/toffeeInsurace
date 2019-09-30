import {AsyncStorage} from 'react-native';

_storeData = async () => {
  try {
    await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
  } catch (error) {
    console.log("Error saving data")
  }
};



export const saveSessionData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key,data);
  } catch (error) {
    console.log("Error saving data")
  }
};

export const getSessionData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
        return value
    }
  } catch (error) {
    console.log("Error getting data")
  }

};

export const particularKey = key => {
  return AsyncStorage.removeItem(key);
};

export const clearSession = () => {
  return AsyncStorage.clear();
};
