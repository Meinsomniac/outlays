import React from 'react';
import {FormControl, Input, Text, WarningOutlineIcon} from 'native-base';
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
          <Input
            {...field}
            onChangeText={field.onChange}
            style={defaultStyles.default}
            variant={'outline'}
            borderRadius={10}
            borderColor={error?.message && 'red.500'}
            {...other}
          />
          {error?.message && (
            <FormControl padding={0}>
              <FormControl.HelperText
                padding={0}
                margin={0}
                color={'amber.600'}
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {error?.message}
              </FormControl.HelperText>
            </FormControl>
          )}
        </>
      )}
    />
  );
}
