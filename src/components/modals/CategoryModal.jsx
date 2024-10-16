import {Text, View} from 'native-base';
import {CustomModal} from '../common/CustomModal';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {RHFTextField} from '../form/RHFTextField';

export const CategoryModal = ({open, onClose, modalData}) => {
  const methods = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {name: ''},
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required('Name is required'),
      }),
    ),
  });
  return (
    <CustomModal open={open} setOpen={onClose}>
      <FormProvider {...methods}>
        <RHFTextField name={'name'} placeholder={'Category name'} />
      </FormProvider>
    </CustomModal>
  );
};
