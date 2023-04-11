import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Provider, useSelector,useDispatch } from 'react-redux';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import { store } from './store/store';
import IconButton from './components/ui/IconButton';
import { login, logout } from './store/auth';
import { useEffect,useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const dispatch = useDispatch();

  function logoutHandler () {
    dispatch(logout());
  } 

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight:({ tintColor }) => (
          <IconButton icon="exit" color={tintColor} size={24} onPress={logoutHandler}/>
        )
      }}/>
    </Stack.Navigator>
  );
}

function Navigation() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isLoggedIn);
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      const storedTokenExpiredDate = await AsyncStorage.getItem('tokenExpireDate');
      if(storedToken) {
        dispatch(login({token:storedToken, tokenExpireDate:storedTokenExpiredDate}));
      }
      setIsTryingLogin(false);
    }

    fetchToken()
  },[])

  if(isTryingLogin) {
    return <AppLoading/>
  }

  return (
    <NavigationContainer>
      {!isAuth && <AuthStack />}
      {isAuth && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
}
