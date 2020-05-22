import {useEffect, useState} from 'react';
import {AsyncStorage} from 'react-native';

export const useAsyncStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((value) => {
        if (value === null) {
          return initialValue;
        }
        return JSON.parse(value);
      })
      .then(setStoredValue);
  }, [key, initialValue]);

  const setValue = async (value: any) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
}
