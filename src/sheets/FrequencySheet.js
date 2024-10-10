import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Modal, Text, View} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {RHFSelect} from '../components/form/RHFSelect';
import {useFormContext} from 'react-hook-form';
import dayjs from 'dayjs';
import {frequencyOptions} from '../utils/common';
import DateTimePicker from 'react-native-ui-datepicker';
import {CustomModal} from '../components/common/CustomModal';

export function FrequencySheet({open}) {
  //Local State
  const [dates, setDates] = useState({
    startDate: dayjs(),
    endDate: dayjs(),
  });

  const sheetRef = useRef();
  const {watch} = useFormContext();
  const {frequency, startDate, endDate} = watch();

  useEffect(() => {
    open && sheetRef.current.show();
  }, [open]);

  const calculateDate = useCallback(key => {
    return key;
  }, []);

  return (
    <ActionSheet
      ref={sheetRef}
      onClose={() => console.log(!!frequency, '<><><>')}>
      <View style={styles.container}>
        <RHFSelect
          name={'frequency'}
          placeholder={'Frequency'}
          options={frequencyOptions}
        />
        <View style={styles.dateContainer}>
          <TouchableOpacity style={styles.dates}>
            <Text>{calculateDate('start')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dates}>
            <Text>{calculateDate('end')}</Text>
          </TouchableOpacity>
        </View>
        <CustomModal open={true}>
          <View style={styles.container}>
            <DateTimePicker
              calendarTextStyle={{
                color: 'black',
              }}
              headerTextStyle={{
                color: 'black',
              }}
              mode="single"
              date={dayjs()}
              // onChange={(params) => setDate(params.date)}
            />
          </View>
        </CustomModal>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    rowGap: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'center',
  },
  dates: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
});
