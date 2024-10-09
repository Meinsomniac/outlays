import React from 'react';
import {FormControl, Select, WarningOutlineIcon} from 'native-base';
import {Controller, useFormContext} from 'react-hook-form';
import {Alert} from 'react-native';
import {defaultStyles} from '../../constants/defaultStyles';

export function RHFSelect({name, options, placeholder, addOptionLabel}) {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <FormControl isInvalid={!!error?.message}>
          <Select
            selectedValue={field.value}
            onValueChange={field.onChange}
            placeholder={placeholder || 'Select an option'}
            style={defaultStyles.default}
            borderRadius={10}
            _text={{
              fontSize: 'lg',
            }}>
            {[
              {
                title: addOptionLabel || 'Add a category',
                value: null,
                onClick: () =>
                  Alert.alert(
                    'In progress',
                    'the functionality you are trying to access is currently in progress',
                    [],
                    {
                      cancelable: true,
                    },
                  ),
              },
              ...options,
            ]?.map(({title, value, onClick}) => {
              return value ? (
                <Select.Item label={title} value={value} key={title} />
              ) : (
                <Select.Item
                  label={title}
                  key={title}
                  onPress={() => {
                    onClick();
                  }}
                />
              );
            })}
          </Select>
          {error?.message && (
            <FormControl.ErrorMessage
              padding={0}
              margin={0}
              color={'amber.600'}
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {error?.message}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
      )}
    />
  );
}
