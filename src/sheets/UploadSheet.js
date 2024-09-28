import React from 'react';
import {Button, Text, View} from 'native-base';
import {useCallback, useRef} from 'react';
import {StyleSheet} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import DocumentPicker from 'react-native-document-picker';
import {Iconify} from 'react-native-iconify';

export const UploadSheet = ({payload}) => {
  const {setFileResponse, setValue, name} = payload; // use the same setter name when using from different modules
  const sheetRef = useRef();

  //Local States
  const attachmentOptions = [
    {
      title: 'Camera',
      key: 'camera',
      icon: (
        <Iconify
          icon="f7:camera-fill"
          color={'#7F3DFF'}
          height={32}
          width={32}
        />
      ),
      onClick: () => console.log('camera'),
    },
    {
      title: 'Image',
      key: 'image',
      icon: (
        <Iconify
          icon="mage:image-fill"
          color={'#7F3DFF'}
          height={32}
          width={32}
        />
      ),
      onClick: () => handleDocumentSelection('image/*'),
    },
    {
      title: 'Document',
      key: 'document',
      icon: (
        <Iconify
          icon="fluent:document-32-filled"
          color={'#7F3DFF'}
          height={32}
          width={32}
        />
      ),
      onClick: () =>
        handleDocumentSelection([
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/pdf',
          'text/csv',
        ]),
    },
  ];
  //Functions
  const handleDocumentSelection = useCallback(async type => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type,
      });
      setFileResponse(response);
      setValue(name, response);
      sheetRef.current.hide();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ActionSheet
      ref={sheetRef}
      gestureEnabled
      // indicatorStyle={{
      //   backgroundColor: '#EEE5FF',
      // }}
      // containerStyle={{
      //   paddingTop: 4,
      // }}
    >
      <View style={styles.mainSheet}>
        {attachmentOptions?.map((option, index) => (
          <Button
            style={styles?.button}
            key={option?.key + index}
            onPress={option?.onClick}>
            <View style={styles?.centerAlign}>
              {option?.icon}
              <Text style={styles?.title}>{option?.title}</Text>
            </View>
          </Button>
        ))}
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  mainSheet: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    display: 'flex',
    flexDirection: 'row',
    rowGap: 8,
    gap: 8,
  },
  button: {
    flex: 1,
    backgroundColor: '#EEE5FF',
    borderRadius: 15,
  },
  centerAlign: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 14,
    color: '#7F3DFF',
    fontWeight: '500',
  },
});
