import {Button, Text, View} from 'native-base';
import React, {useCallback} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {RHFTextField} from '../../components/form/RHFTextField';
import {FormProvider, useForm} from 'react-hook-form';

export default function SignUp() {
  const methods = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: {errors},
  } = methods;

  const onSubmit = useCallback(async values => {
    console.log(values);
  }, []);

  console.log(errors);
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <FormProvider {...methods}>
          <RHFTextField name={'email'} placeholder={'Email'} />
          <RHFTextField name={'password'} placeholder={'Placeholder'} />
          <Button
            onPress={() => {
              console.log('here');
              handleSubmit(onSubmit);
            }}
            style={styles.continueBtn}>
            <Text color={'white'}>Submit</Text>
          </Button>
        </FormProvider>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: () => ({
    flex: 1,
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 25,
  }),
  continueBtn: {
    borderRadius: 10,
    backgroundColor: '#7F3DFF',
  },
});
