import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Text, View} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {RHFSelect} from '../components/form/RHFSelect';
import {useFormContext} from 'react-hook-form';
import dayjs from 'dayjs';
import {formatDate, frequencyOptions} from '../utils/common';
import DateTimePicker from 'react-native-ui-datepicker';
import {CustomModal} from '../components/common/CustomModal';
import {RHFTextField} from '../components/form/RHFTextField';
import ActionSheet from 'react-native-actions-sheet';

export function FrequencySheet({open, onClose}) {
  //Local State
  const [dateType, setDateType] = useState('');
  const [modalOpen, setModalOpen] = useState('false');

  const sheetRef = useRef();
  const {watch, setValue} = useFormContext();
  const {frequency, cycles, startDate, endDate} = watch();

  const cyclesVisible = useMemo(() => frequency !== 'custom', [frequency]);

  const calculateDate = useCallback(
    (date, cycle = 1) => {
      let start, end;
      start = date || dayjs();
      switch (frequency) {
        case 'yr':
          end = dayjs(start)?.add(cycle, 'years');
          break;
        case 'mon':
          end = dayjs(start)?.add(cycle, 'months');
          break;
        case 'daily':
        case 'custom':
        case 'default':
          end = dayjs(start)?.add(cycle, 'days');
          break;
      }
      setValue('startDate', start);
      setValue('endDate', end);
    },
    [frequency, setValue],
  );

  useLayoutEffect(() => {
    open && sheetRef.current.show();
  }, [open]);

  useEffect(() => {
    calculateDate(startDate, cycles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frequency]);

  return (
    <ActionSheet ref={sheetRef} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.flexStyle}>
          <RHFSelect
            name={'frequency'}
            placeholder={'Frequency'}
            options={frequencyOptions}
            flexGrow={1}
          />
          {cyclesVisible && (
            <RHFTextField
              name={'cycles'}
              placeholder={'1'}
              flexGrow={1}
              onChange={value => {
                calculateDate(startDate, value);
              }}
              keyboardType="numeric"
              rightElement={
                <Text fontSize={'sm'} color={'muted.400'} mr={2}>
                  /cycles
                </Text>
              }
            />
          )}
        </View>
        <View style={styles.dateContainer}>
          <TouchableOpacity
            style={styles.dates()}
            // disabled={cyclesVisible}
            onPress={() => {
              setDateType('startDate');
              setModalOpen(true);
            }}>
            <Text>{formatDate(startDate)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dates(cyclesVisible)}
            disabled={cyclesVisible}
            onPress={() => {
              setDateType('endDate');
              setModalOpen(true);
            }}>
            <Text>{formatDate(endDate)}</Text>
          </TouchableOpacity>
        </View>
        <CustomModal open={modalOpen} setOpen={setModalOpen}>
          <View style={styles.container}>
            <DateTimePicker
              calendarTextStyle={styles.calendarTextStyle}
              headerTextStyle={styles.headerTextStyle}
              headerButtonColor="blue"
              headerButtonStyle={styles.headerButtonStyle}
              headerContainerStyle={styles.headerContainerStyle}
              weekDaysTextStyle={styles.weekDaysTextStyle}
              displayFullDays={true}
              minDate={dateType === 'endDate' ? endDate : ''}
              onChange={value => {
                dateType === 'startDate'
                  ? calculateDate(value?.date)
                  : setValue(dateType, dayjs(value?.date));
                setModalOpen(false);
              }}
              mode="single"
              date={dateType === 'endDate' ? endDate : startDate}
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
  dates: disbaled => ({
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 10,
    opacity: disbaled ? 0.5 : 1,
    flex: 1,
  }),
  calendarTextStyle: {
    color: 'black',
  },
  headerTextStyle: {
    color: 'black',
  },
  headerContainerStyle: {
    backgroundColor: '#eff3f7',
    borderRadius: 8,
  },
  headerButtonStyle: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
  },
  weekDaysTextStyle: {
    color: 'gray',
  },
  flexStyle: {
    flexDirection: 'row',
    columnGap: 5,
  },
});
