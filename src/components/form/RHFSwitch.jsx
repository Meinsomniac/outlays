import {Switch} from 'native-base';
import {useState} from 'react';
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
