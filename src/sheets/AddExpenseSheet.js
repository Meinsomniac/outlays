import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import ActionSheet, {
  SheetManager,
  useScrollHandlers,
} from 'react-native-actions-sheet';
import {RHFSelect} from '../components/form/RHFSelect';
import {RHFTextField} from '../components/form/RHFTextField';
import {Box, Button, HStack, Image, Text} from 'native-base';
import {Iconify} from 'react-native-iconify';
import {RHFSwitch} from '../components/form/RHFSwitch';
import {useFormContext} from 'react-hook-form';
import {useAddExpenseMutation} from '../redux/expense/expenseActions';
import {getStorage} from '../utils/storageUtils';
import {AlertContext} from '../contexts/AlertContext';
import {useSpinAnimation} from '../utils/useAnimations';
import {FrequencySheet} from './FrequencySheet';
import {formatDate} from '../utils/common';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';

export const AddExpenseSheet = ({type}) => {
  //Local States
  const [fileResponse, setFileResponse] = useState(null);
  const [open, setOpen] = useState(false);

  const sheetRef = useRef(null);
  const handlers = useScrollHandlers();
  const isTransfer = type?.toLowerCase() === 'transfer';
  const [spinValue, startSpin] = useSpinAnimation({
    value: 0,
  });

  const {handleSubmit, setValue, reset, watch} = useFormContext();
  const {showAlert} = useContext(AlertContext);

  //Api calls
  const [addExpense, {isLoading}] = useAddExpenseMutation();

  //Functions
  const onSubmit = useCallback(async values => {
    console.log(values);
    // const formData = new FormData();
    // Object.entries(values)?.forEach(([key, value]) => {
    //   if (key === 'file') {
    //     formData.append(key, {
    //       name: values?.file?.name || values?.file?.fileName,
    //       type: values?.file?.type,
    //       uri: values?.file?.uri,
    //     });
    //   } else formData.append(key, value);
    // });
    // formData?.append('type', type?.toLowerCase0);
    // const response = await addExpense(formData);
    // if (response?.data) {
    //   showAlert({
    //     title: response?.data?.message,
    //   });
    //   reset({
    //     amount: '',
    //     category: '',
    //     description: '',
    //     wallet: '',
    //     repeat: false,
    //     file: '',
    //     from: '',
    //     to: '',
    //   });
    // } else {
    //   0;
    //   showAlert({
    //     title: response?.error?.message,
    //     status: 'error',
    //   });
    // }
  }, []);

  const swapValues = useCallback(() => {
    startSpin(1);
    const temp = watch('from');
    setValue('from', watch('to'), {shouldValidate: true});
    setValue('to', temp, {shouldValidate: true});
  }, [setValue, startSpin, watch]);

  useLayoutEffect(() => {
    const sheet = sheetRef?.current;
    sheet?.show();
    return () => sheet?.hide();
  }, []);

  const {startDate, endDate, repeat} = watch();

  return (
    <>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <ActionSheet
          containerStyle={styles.mainSheetStyle}
          ref={sheetRef}
          isModal={false}
          closable={false}
          backgroundInteractionEnabled={true}
          keyboardHandlerEnabled={false}
          extraScrollHeight={0}>
          <NativeViewGestureHandler
            simultaneousHandlers={handlers.simultaneousHandlers}>
            <ScrollView {...handlers}>
              <View style={styles.spacing}>
                {isTransfer ? (
                  <View style={styles.fromTo}>
                    <RHFTextField
                      placeholder={'From'}
                      name={'from'}
                      flexGrow={1}
                    />
                    <RHFTextField placeholder={'To'} name={'to'} flexGrow={1} />
                    <TouchableOpacity
                      style={styles.transfer(spinValue)}
                      activeOpacity={0.8}
                      onPress={swapValues}>
                      <Iconify
                        icon="solar:transfer-horizontal-bold-duotone"
                        color={'#7F3DFF'}
                        size={35}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  ''
                )}
                {!isTransfer ? (
                  <RHFSelect
                    name={'category'}
                    placeholder={'Category'}
                    addOptionLabel={'Add a category'}
                    options={[
                      {
                        title: 'Movie',
                        value: 'movie',
                      },
                    ]}
                  />
                ) : (
                  ''
                )}
                <RHFTextField
                  name={'description'}
                  placeholder={'Description'}
                />
                {!isTransfer ? (
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
                ) : (
                  ''
                )}
                {fileResponse ? (
                  <View style={styles.imageContainer}>
                    <Image
                      src={fileResponse?.uri}
                      alt={
                        fileResponse?.type?.includes('image')
                          ? 'Image'
                          : 'Document'
                      }
                      size={'lg'}
                      style={styles.imageStyle}
                    />
                    <Button
                      style={styles.uploadCancel}
                      size={6}
                      onPress={() => setFileResponse(null)}>
                      <Iconify
                        icon="basil:cross-solid"
                        size={24}
                        color={'white'}
                      />
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
                {!isTransfer ? (
                  <View style={styles.repeat}>
                    <View style={styles.repeatText}>
                      <Text fontSize={16}>Repeat</Text>
                      <Text variant={'p'} color={'gray.400'}>
                        Repeat Transaction
                      </Text>
                    </View>
                    <RHFSwitch name={'repeat'} />
                  </View>
                ) : (
                  ''
                )}

                {repeat && (
                  <View style={styles.flexStyle}>
                    <TouchableOpacity
                      style={styles.date}
                      onPress={() => setOpen(true)}>
                      <Text fontWeight={'semibold'}>Start Date</Text>
                      <Box>{formatDate(startDate)}</Box>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.date}
                      onPress={() => setOpen(true)}>
                      <Text fontWeight={'semibold'}>End Date</Text>
                      <Box>{formatDate(endDate)}</Box>
                    </TouchableOpacity>
                  </View>
                )}

                <Button
                  onPress={handleSubmit(onSubmit)}
                  style={styles.continueBtn}
                  isLoading={isLoading}>
                  <Text color={'white'}>Continue</Text>
                </Button>
              </View>
            </ScrollView>
          </NativeViewGestureHandler>
        </ActionSheet>
      </ScrollView>
      <FrequencySheet open={open} onClose={() => setOpen(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  mainSheetStyle: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
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
  transfer: value => ({
    padding: 1,
    borderRadius: 50,
    borderWidth: 0.5,
    position: 'absolute',
    backgroundColor: 'white',
    borderColor: 'gray',
    top: 5,
    transform: [
      {
        rotate: value,
      },
    ],
  }),
  fromTo: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 15,
    minWidth: '100%',
  },
  flexStyle: {
    flexDirection: 'row',
    columnGap: 8,
  },
  date: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eff3f7',
    borderRadius: 8,
    padding: 8,
  },
});
