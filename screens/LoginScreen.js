import { useState } from 'react';
import { loginUser } from '../util/auth';
import { useDispatch } from 'react-redux';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverLay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { login } from '../store/auth';

function LoginScreen() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  async function loginHandler(userInfo) {
    setIsLoading(true);
    try {
      const res = await loginUser(userInfo.email,userInfo.password);
      dispatch(login({token:res.token, tokenExpireDate:res.tokenExpireDate.format('YYYY-MM-DD hh:mm:ss')}))
      setIsLoading(false);
    }catch(err) {
      setIsLoading(false);
      Alert.alert('Authentication failed =>' , err.message)
    }
  }

  if(isLoading) {
    return <LoadingOverLay message="creating user..."/>
  } else {
    return <AuthContent isLogin onAuthenticate={loginHandler}/>;
  }
  
}

export default LoginScreen;
