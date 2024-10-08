import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useMemo, useRef} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import * as Yup from 'yup';
import {AddExpenseSheet} from '../../sheets/AddExpenseSheet';
import {KeyboardAvoidingView, Text} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RHFTextField} from '../../components/form/RHFTextField';
import {position} from 'native-base/lib/typescript/theme/styled-system';
import {isNumber} from '../../utils/common';
import {Iconify} from 'react-native-iconify';

const defaultValues = {
  amount: '',
  category: '',
  description: '',
  wallet: '',
  file: '',
  repeat: false,
};

export const AddExpensePage = ({route}) => {
  const AddExpenseSchema = Yup.object().shape({
    amount: Yup.string().required(),
    category: Yup.string().required(),
    description: Yup.string().required(),
    wallet: Yup.string().required(),
    file: Yup.object().required(),
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
          <View style={styles.amountContainer}>
            <Text color={'gray.200'} fontSize={18} paddingX={5}>
              How much?
            </Text>
            <RHFTextField
              name={'amount'}
              customStyle={styles.amount}
              variant={'unstyled'}
              placeholder={'0.00'}
              placeholderColor={'white'}
              keyboardType="numeric"
              selectionColor="white"
              leftElement={
                <Iconify icon="mdi:rupee" color={'white'} size={50} />
              }
            />
          </View>
          <AddExpenseSheet />
        </View>
      </FormProvider>
    </>
  );
};

const styles = StyleSheet.create({
  body: ({color}) => ({
    flex: 1,
    position: 'relative',
    ...(color && {backgroundColor: color}),
  }),
  amount: {
    fontSize: 50,
    height: 100,
    borderWidth: 0,
    lineHeight: 60,
    color: 'white',
  },
  amountContainer: {
    flexDirection: 'column',
    rowGap: 0,
  },
});
