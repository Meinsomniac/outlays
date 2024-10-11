import React from 'react';
import {FormControl, Select, View, WarningOutlineIcon} from 'native-base';
import {Controller, useFormContext} from 'react-hook-form';
import {Alert} from 'react-native';

export function RHFSelect({
  name,
  options,
  placeholder,
  addOptionLabel,
  flexGrow,
}) {
  const {control} = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <View
          style={{
            flex: flexGrow,
          }}>
          <FormControl isInvalid={!!error?.message} isReadOnly>
            <Select
              selectedValue={field.value}
              variant="filled"
              onValueChange={field.onChange}
              placeholder={placeholder || 'Select an option'}
              borderRadius={10}
              _text={{
                fontSize: 'lg',
              }}
              isFocused={false}
              isFocusVisible={false}>
              {[
                ...(addOptionLabel
                  ? [
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
                    ]
                  : []),
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
        </View>
      )}
    />
  );
}
