import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {RHFSelect} from '../components/form/RHFSelect';
import {RHFTextField} from '../components/form/RHFTextField';
import {Button, Image, Text} from 'native-base';
import {Iconify} from 'react-native-iconify';
import {RHFSwitch} from '../components/form/RHFSwitch';
import {useFormContext} from 'react-hook-form';

export const AddExpenseSheet = () => {
  const sheetRef = useRef(null);
  const [fileResponse, setFileResponse] = useState([]);

  useLayoutEffect(() => {
    sheetRef?.current?.show();
    return () => sheetRef?.current?.hide();
  }, []);

  const {handleSubmit, setValue, formState, watch} = useFormContext();

  //Functions
  const onSubmit = useCallback(async values => {
    console.log({values});
  }, []);

  console.log(formState, 'errors', watch());

  return (
    <ActionSheet
      containerStyle={styles.mainSheetStyle}
      ref={sheetRef}
      isModal={false}
      closable={false}
      backgroundInteractionEnabled={true}
      keyboardHandlerEnabled={false}>
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
        {fileResponse?.length ? (
          <View style={styles.imageContainer}>
            <Image
              src={fileResponse?.[0]?.uri}
              alt={
                fileResponse?.[0]?.type?.includes('image')
                  ? 'Image'
                  : 'Document'
              }
              size={'lg'}
              style={styles.imageStyle}
            />
            <Button style={styles.uploadCancel} size={6}>
              <Iconify icon="basil:cross-solid" size={24} color={'white'} />
            </Button>
          </View>
        ) : (
          <Button
            variant={'unstyled'}
            style={styles.attachmentButton}
            onPress={() =>
              SheetManager.show('upload-sheet', {
                payload: {
                  fileResponse,
                  setFileResponse,
                  name: 'file',
                  setValue,
                },
              })
            }>
            <Text style={styles.attachmentTitle}>Add Attachment</Text>
          </Button>
        )}
        <View style={styles.repeat}>
          <View style={styles.repeatText}>
            <Text fontSize={16}>Repeat</Text>
            <Text variant={'p'} color={'gray.400'}>
              Repeat Transaction
            </Text>
          </View>
          <RHFSwitch name={'repeat'} />
        </View>
        <Button
          onPress={() => handleSubmit(onSubmit)}
          style={styles.continueBtn}>
          <Text color={'white'}>Continue</Text>
        </Button>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  mainSheetStyle: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  spacing: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 16,
  },
  attachmentButton: {
    borderRadius: 10,
    height: 60,
    borderColor: '#F1F1FA',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  attachmentTitle: {
    color: '#91919F',
  },
  imageContainer: {
    position: 'relative',
    width: 90,
  },
  imageStyle: {
    borderRadius: 10,
  },
  uploadCancel: {
    position: 'absolute',
    backgroundColor: 'gray',
    opacity: 0.7,
    borderRadius: 50,
    right: -10,
    top: -10,
  },
  repeat: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  repeatText: {
    rowGap: 4,
    display: 'flex',
    flexDirection: 'column',
  },
  continueBtn: {
    borderRadius: 10,
    backgroundColor: '#7F3DFF',
  },
});
