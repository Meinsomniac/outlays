import React from 'react';
import {FormControl, Input, WarningOutlineIcon} from 'native-base';
import {Controller, useFormContext} from 'react-hook-form';
import {defaultStyles} from '../../constants/defaultStyles';

export function RHFTextField({name, ...other}) {
  const {control} = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <>
          <FormControl isInvalid={!!error?.message} padding={0}>
            <Input
              _input={() => ({
                borderColor: 'red',
              })}
              {...field}
              onChangeText={field.onChange}
              style={defaultStyles.default}
              variant={'outline'}
              borderRadius={10}
              {...other}
            />
            <FormControl.ErrorMessage
              padding={0}
              margin={0}
              color={'amber.600'}
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {error?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </>
      )}
    />
  );
}
