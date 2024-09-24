import {yupResolver} from '@hookform/resolvers/yup';
import React, {useMemo} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import * as Yup from 'yup';
import {AddExpenseSheet} from '../../sheets/AddExpenseSheet';
import {KeyboardAvoidingView} from 'native-base';
import {RHFTextField} from '../../components/form/RHFTextField';

const defaultValues = {
  // amount: '',
  category: '',
  description: '',
  wallet: '',
  file: '',
  repeat: false,
};

export const AddExpensePage = ({route}) => {
  const AddExpenseSchema = Yup.object().shape({
    // amount: Yup.number().required(),
    category: Yup.string().required(),
    description: Yup.string().required(),
    wallet: Yup.string().required(),
    file: Yup.array().required(),
    repeat: Yup.bool(),
  });

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
          <View style={styles.amount}>
            <RHFTextField name={'amount'} />
            <AddExpenseSheet />
          </View>
        </View>
      </FormProvider>
    </>
  );
};

const styles = StyleSheet.create({
  body: ({color}) => ({
    flex: 1,
    ...(color && {backgroundColor: color}),
  }),
  amount: {
    flexDirection: 'column-reverse',
    flexGrow: 1,
  },
});
