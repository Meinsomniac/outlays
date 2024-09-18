import {yupResolver} from '@hookform/resolvers/yup';
import React, {useMemo} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import * as Yup from 'yup';
import {AddExpenseSheet} from '../../sheets/AddExpenseSheet';
import {KeyboardAvoidingView} from 'native-base';
import {RHFTextField} from '../../components/form/RHFTextField';

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
      amount: Yup.number().required(),
      category: Yup.string().required(),
      description: Yup.string().required(),
      wallet: Yup.string().required(),
      file: Yup.object().required(),
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
      <FormProvider {...methods}>
        <View style={styles.body({color: route?.params?.color})}>
          <RHFTextField
            name={'amount'}
            style={{alignSelf: 'flex-end', justifySelf: 'end'}}
          />
          <AddExpenseSheet />
        </View>
      </FormProvider>
    </>
  );
};

const styles = StyleSheet.create({
  body: ({color}) => ({
    flex: 1,
    // alignSelf:'flex-end',
    ...(color && {backgroundColor: color}),
  }),
});
