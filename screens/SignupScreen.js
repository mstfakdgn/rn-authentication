import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/auth';

import LoadingOverLay from '../components/ui/LoadingOverlay';

function SignupScreen() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  async function signupHandler(userInfo) {
    setIsLoading(true);
    try {
      const res = await createUser(userInfo.email,userInfo.password);
      dispatch(login(res.token, res.tokenExpireDate))
      setIsLoading(false);

    }catch(err) {
      setIsLoading(false);
      Alert.alert('SignUp failed =>' , err.message)
    }
  }

  if(isLoading) {
    return <LoadingOverLay message="creating user..."/>
  }else {
    return <AuthContent onAuthenticate={signupHandler}/>;
  }

}

export default SignupScreen;
