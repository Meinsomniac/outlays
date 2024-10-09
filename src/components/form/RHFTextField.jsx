import React from 'react';
import {FormControl, Input, View, WarningOutlineIcon} from 'native-base';
import {Controller, useFormContext} from 'react-hook-form';
import {defaultStyles} from '../../constants/defaultStyles';
import {useWindowDimensions} from 'react-native';

export function RHFTextField({
  name,
  customStyle,
  placeholderColor,
  variant,
  leftElement,
  flexGrow,
  ...other
}) {
  const {control} = useFormContext();
  const {width} = useWindowDimensions();
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <View
          style={{
            flex: flexGrow,
          }}>
          <FormControl isInvalid={!!error?.message} padding={0}>
            <Input
              {...field}
              onChangeText={field.onChange}
              variant={variant || 'outline'}
              borderRadius={10}
              placeholderTextColor={placeholderColor}
              leftElement={leftElement}
              {...other}
              style={[defaultStyles.default, customStyle]}
            />
            <FormControl.ErrorMessage
              padding={0}
              margin={0}
              color={'amber.600'}
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {error?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </View>
      )}
    />
  );
}
