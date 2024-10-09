import {Alert, Button, HStack, Text, VStack} from 'native-base';
import {createContext, useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {delay, getAlertIcon} from '../utils/common';
import {Iconify} from 'react-native-iconify';

const defaultOptions = {
  variant: 'subtle',
  status: 'success',
  colorScheme: 'success',
  duration: 3,
};
export const AlertContext = createContext({
  showAlert: ({
    variant,
    status,
    colorScheme,
    position,
    title,
    description,
    duration,
  }) => Promise.resolve(),
});
export const AlertProvider = ({children}) => {
  const [options, setOptions] = useState(defaultOptions);
  const [visible, setVisible] = useState(false);

  const showAlert = useCallback(
    args => {
      setOptions(prev => ({
        ...prev,
        ...args,
      }));
      setVisible(true);
    },
    [setOptions],
  );

  useEffect(() => {
    if (visible) {
      (async () => {
        await delay(options?.duration);
        setVisible(false);
        setOptions(defaultOptions);
      })();
    }
  }, [visible]);

  return (
    <AlertContext.Provider
      value={{
        showAlert,
      }}>
      {visible ? (
        <HStack style={styles.alertContainer}>
          <Alert
            status={options?.status}
            colorScheme={options.colorScheme}
            variant={options.variant}
            padding={0}
            w={'80%'}>
            <HStack
              alignItems={'center'}
              justifyContent={'space-between'}
              paddingX={3}
              paddingY={2}
              w={'100%'}>
              <HStack style={styles.gap}>
                {getAlertIcon(options?.status, 20)}
                <VStack>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: 'black',
                      display: !options?.title ? 'none' : '',
                    }}>
                    {options?.title || 'Title'}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      display: !options?.description ? 'none' : '',
                    }}>
                    {options?.description}
                  </Text>
                </VStack>
              </HStack>
              <Button
                onPress={() => setVisible(false)}
                backgroundColor={'none'}
                padding={0}>
                <Iconify icon="proicons:cancel" color={'gray'} size={20} />
              </Button>
            </HStack>
          </Alert>
        </HStack>
      ) : (
        ''
      )}
      {children}
    </AlertContext.Provider>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  gap: {
    columnGap: 10,
    alignItems: 'center',
  },
});
