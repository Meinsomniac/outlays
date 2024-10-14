import {Text, View} from 'native-base';
import React, {memo} from 'react';
import {useGetAllExpensesQuery} from '../../redux/expense/expenseActions';
import {FlashList} from '@shopify/flash-list';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

export const Transactions = () => {
  const {data} = useGetAllExpensesQuery();
  return (
    <View style={styles.container}>
      <FlashList
        keyExtractor={item => {
          return item?._id;
        }}
        data={data}
        renderItem={({item}) => <RenderItem item={item} />}
        estimatedItemSize={15}
      />
    </View>
  );
};

const RenderItem = React.memo(({item}) => (
  <View style={styles.flexHorizontal}>
    <FastImage
      source={{uri: item?.file}}
      style={styles.imageStyle}
      resizeMode={FastImage.resizeMode.cover}
    />
    <View style={styles.detailsContainer}>
      <Text>{item?.category}</Text>
      <Text>{item?.description}</Text>
    </View>
  </View>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  flexHorizontal: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 1,
    margin: 3,
    columnGap: 10,
    borderRadius: 5,
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  detailsContainer: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

memo(Transactions);
