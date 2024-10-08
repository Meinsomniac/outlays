import React from 'react';
import {FormControl, Input, WarningOutlineIcon} from 'native-base';
import {Controller, useFormContext} from 'react-hook-form';
import {defaultStyles} from '../../constants/defaultStyles';

export function RHFTextField({
  name,
  customStyle,
  placeholderColor,
  variant,
  leftElement,
  ...other
}) {
  const {control} = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <>
          <FormControl isInvalid={!!error?.message} padding={0}>
            <Input
              {...field}
              onChangeText={field.onChange}
              style={[defaultStyles.default, customStyle]}
              variant={variant || 'outline'}
              borderRadius={10}
              placeholderTextColor={placeholderColor}
              leftElement={leftElement}
              cursorColor={'white'}
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
