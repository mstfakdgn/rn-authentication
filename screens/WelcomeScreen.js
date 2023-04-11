import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { getMessage } from '../util/auth';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function WelcomeScreen() {
  // const token = useSelector(state => state.auth.token);
  const [fetchedMessage, setFetchedMessage] = useState("");

  useEffect(() => {
    async function getMessageHttp () {
      try {
        const token = await AsyncStorage.getItem('token');
        const message = await getMessage(token);
        setFetchedMessage(message);
      }catch(err) {
        Alert.alert("Message could not be taken =>", err.message)
      }
    }

    getMessageHttp();
  },[]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome! </Text>
      <Text>You authenticated successfully! {fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
