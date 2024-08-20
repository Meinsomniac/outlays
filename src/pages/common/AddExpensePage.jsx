import {yupResolver} from '@hookform/resolvers/yup';
import React, {useMemo} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import * as Yup from 'yup';
import {AddExpenseSheet} from '../../sheets/AddExpenseSheet';
import {KeyboardAvoidingView} from 'native-base';

const defaultValues = {
  category: '',
  description: '',
  wallet: '',
  file: '',
  repeat: false,
};

export const AddExpensePage = ({route}) => {
  const AddExpenseSchema = useMemo(() => {
    return {
      category: Yup.string().required(),
      description: Yup.string().required(),
      wallet: Yup.string().required(),
      file: Yup.string().required(),
      repeat: Yup.bool(),
    };
  }, []);

  const methods = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(AddExpenseSchema),
    defaultValues,
  });
  return (
    <>
      <StatusBar
        backgroundColor={route?.params?.color}
        barStyle={'light-content'}
        hidden={false}
      />
      <SafeAreaView style={styles.body({color: route?.params?.color})}>
        <KeyboardAvoidingView
          style={styles.body({color: route?.params?.color})}>
          <FormProvider {...methods}>
            <AddExpenseSheet />
          </FormProvider>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: ({color}) => ({
    flex: 1,
    ...(color && {backgroundColor: color}),
  }),
});
