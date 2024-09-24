import React from 'react';
import {Switch} from 'native-base';
import {Controller, useFormContext} from 'react-hook-form';

export const RHFSwitch = ({name}) => {
  const methods = useFormContext();
  const {control} = methods;
  return (
    <Controller
      control={control}
      name={name}
      render={({field}) => {
        return <Switch {...field} onToggle={field.onChange} />;
      }}
    />
  );
};
