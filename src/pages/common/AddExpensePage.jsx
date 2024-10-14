import {yupResolver} from '@hookform/resolvers/yup';
import React, {useMemo} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {StatusBar, StyleSheet, View} from 'react-native';
import * as Yup from 'yup';
import {AddExpenseSheet} from '../../sheets/AddExpenseSheet';
import {Text} from 'native-base';
import {RHFTextField} from '../../components/form/RHFTextField';
import {Iconify} from 'react-native-iconify';

export const AddExpensePage = ({route}) => {
  const isTransfer = route?.params?.title?.toLowerCase() === 'transfer';

  const AddExpenseSchema = useMemo(
    () =>
      Yup.object().shape({
        amount: Yup.string().required(),
        description: Yup.string().required(),
        ...(isTransfer
          ? {from: Yup.string().required(), to: Yup.string().required()}
          : {
              repeat: Yup.bool(),
              wallet: Yup.string().required(),
              category: Yup.string().required(),
              frequency: Yup.string().required(),
              cycles: Yup.string().required(),
              startDate: Yup.string().required(),
              endDate: Yup.string().required(),
            }),
      }),
    [isTransfer],
  );

  const defaultValues = useMemo(
    () => ({
      amount: '',
      description: '',
      ...(isTransfer
        ? {
            from: '',
            to: '',
          }
        : {
            category: '',
            wallet: '',
            repeat: false,
            frequency: 'mon',
            cycles: '1',
            startDate: '',
            endDate: '',
          }),
    }),
    [isTransfer],
  );

  const methods = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(AddExpenseSchema),
    shouldFocusError: false,
    defaultValues: defaultValues,
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
              cursorColor={'white'}
              leftElement={
                <Iconify icon="mdi:rupee" color={'white'} size={50} />
              }
            />
          </View>
          <AddExpenseSheet type={route?.params?.title} />
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
  },
});
