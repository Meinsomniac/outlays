import React, {forwardRef} from 'react';
import {FormControl, Input, WarningOutlineIcon} from 'native-base';
import {Controller, useFormContext} from 'react-hook-form';
import {defaultStyles} from '../../constants/defaultStyles';

export const RHFTextField = forwardRef((props, ref) => {
  const {control} = useFormContext();
  const {name, placeholder, ...other} = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <>
          <Input
            ref={ref}
            {...other}
            {...field}
            placeholder={placeholder}
            onChangeText={field.onChange}
            style={defaultStyles.default}
            variant={'outline'}
            borderRadius={10}
          />
          {error?.message && (
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {error?.message}
            </FormControl.ErrorMessage>
          )}
        </>
      )}
    />
  );
});
