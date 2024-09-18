import {Input} from 'native-base';
import {Controller, useFormContext} from 'react-hook-form';
import {defaultStyles} from '../../constants/defaultStyles';

export function RHFTextField({name, placeholder, ...other}) {
  const {control} = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <>
          <Input
            {...field}
            placeholder={placeholder}
            onChangeText={field.onChange}
            style={defaultStyles.default}
            variant={'outline'}
            borderRadius={10}
            {...other}
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
}
