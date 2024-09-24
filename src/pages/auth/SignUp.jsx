import {Button, Text, View} from 'native-base';
import React, {useCallback} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {RHFTextField} from '../../components/form/RHFTextField';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function SignUp() {
  const SignUpSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });
  const methods = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {handleSubmit} = methods;

  const onSubmit = useCallback(async values => {
    console.log({values});
  }, []);

  return (
    <FormProvider {...methods}>
      <SafeAreaView style={styles.body()}>
        <View style={styles.content}>
          <RHFTextField name={'email'} placeholder={'Email'} />
          <RHFTextField name={'password'} placeholder={'Password'} />
          <Button onPress={handleSubmit(onSubmit)} style={styles.continueBtn}>
            <Text color={'white'}>Submit</Text>
          </Button>
        </View>
      </SafeAreaView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  body: () => ({
    flex: 1,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  continueBtn: {
    borderRadius: 10,
    backgroundColor: '#7F3DFF',
  },
  content: {
    width: '80%',
    elevation: 3,
    padding: 20,
    backgroundColor: '#fff',
    rowGap: 15,
  },
});
