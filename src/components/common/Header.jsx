import {useNavigation} from '@react-navigation/native';
import {Box, IconButton, Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Iconify} from 'react-native-iconify';

export const Header = ({
  headerTitle,
  headerTextStyle,
  headerContainerStyle,
  headerBackEnabled,
}) => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.header}>
      <Box>
        {headerBackEnabled ? (
          <IconButton
            icon={<Iconify icon={'mdi:arrow-back'} size={25} color={'black'} />}
            onPress={() => navigate(-1)}
          />
        ) : (
          ''
        )}

        <Text fontSize={'2xl'} fontWeight={'bold'}>
          {headerTextStyle}
        </Text>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
