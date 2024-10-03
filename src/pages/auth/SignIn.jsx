import {Button, Text, View} from 'native-base';
import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {RHFTextField} from '../../components/form/RHFTextField';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {validations} from '../../utils/commonValidations';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  useSignInMutation,
  useSignInWithGoogleMutation,
} from '../../redux/auth/authActions';
import {Link, useNavigation} from '@react-navigation/native';
import {paths} from '../../routes/paths';
import {setUserDetails} from '../../redux/auth/authSlice';
import {useDispatch} from 'react-redux';
import {setStorage} from '../../utils/storageUtils';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const SignInSchema = Yup.object().shape({
  email: validations.email(),
  password: validations.password(),
});

GoogleSignin.configure({
  webClientId: process.env.GOOGLE_CLIENT_ID,
});

const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  await GoogleSignin.signOut();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};

export default function SignIn() {
  //Local States
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  //Hooks
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const methods = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //Apis
  //TODO: Put this api call in authcontext
  const [signIn] = useSignInMutation();
  const [signInWithGoogle] = useSignInWithGoogleMutation();

  const {handleSubmit} = methods;

  const onSubmit = useCallback(
    async values => {
      const res = await signIn(values);
      if (res?.data?.accessToken) {
        await setStorage('token', res?.data?.accessToken);
        navigate(paths.home);
        dispatch(setUserDetails(res?.data?.profile));
      }
    },
    [signIn],
  );

  const handleGoogleLogin = useCallback(async () => {
    try {
      const response = await GoogleLogin();
      const {idToken, user} = response?.data;

      if (idToken) {
        const resp = await signInWithGoogle({token: idToken});
      }
    } catch (apiError) {
      console.log(apiError, statusCodes);
      setError(
        apiError?.response?.data?.error?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <FormProvider {...methods}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.flexStyle}
        style={styles.body()}
        extraScrollHeight={120}
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <RHFTextField name={'email'} placeholder={'Email'} />
          <RHFTextField name={'password'} placeholder={'Password'} />
          <Button onPress={handleSubmit(onSubmit)} style={styles.continueBtn}>
            <Text color={'white'}>Submit</Text>
          </Button>
          {/* <Pressable onPress={handleGoogleLogin}>
            <Text>Google Login</Text>
          </Pressable> */}
        </View>
        <Text fontSize={16}>
          Didn't have a account?{' '}
          <Link to={{screen: paths.signUp}} style={styles.linkStyle}>
            Sign up
          </Link>
        </Text>
        <Text>Or</Text>
        <GoogleSigninButton
          onPress={handleGoogleLogin}
          style={styles.googleBtn}
        />
      </KeyboardAwareScrollView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  body: () => ({
    flex: 1,
    backgroundColor: '#E5E5E5',
  }),
  continueBtn: {
    borderRadius: 10,
    backgroundColor: '#7F3DFF',
  },
  content: {
    width: '80%',
    elevation: 2,
    padding: 20,
    backgroundColor: '#fff',
    rowGap: 15,
  },
  flexStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 5,
  },
  linkStyle: {
    textDecorationLine: 'underline',
    textDecorationColor: 'blue',
    color: 'blue',
    fontSize: 16,
  },
  googleBtn: {
    width: '80%',
  },
});
