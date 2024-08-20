import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {RHFSelect} from '../components/form/RHFSelect';
import {RHFTextField} from '../components/form/RHFTextField';

export const AddExpenseSheet = ({}) => {
  const sheetRef = useRef(null);

  useLayoutEffect(() => {
    sheetRef?.current?.show();
    return () => sheetRef?.current?.hide();
  }, [sheetRef]);

  return (
    <ActionSheet
      containerStyle={styles.mainSheetStyle}
      closable={false}
      isModal={false}
      ref={sheetRef}
      backgroundInteractionEnabled={true}>
      <View style={styles.spacing}>
        <RHFSelect
          name={'category'}
          placeholder={'Select a Category'}
          options={[
            {
              title: 'Movie',
              value: 'movie',
            },
          ]}
        />
        <RHFTextField name={'description'} placeholder={'Description'} />
        <RHFSelect
          name={'wallet'}
          placeholder={'Wallet'}
          addOptionLabel={'Add a wallet'}
          options={[
            {
              title: 'PayPal',
              value: 'paypal',
            },
          ]}
        />
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  mainSheetStyle: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 450,
  },
  spacing: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 16,
  },
});
