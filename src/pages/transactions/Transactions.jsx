import {Box, HStack, Skeleton, Text, View} from 'native-base';
import React, {memo, useMemo, useState} from 'react';
import {useGetAllExpensesQuery} from '../../redux/expense/expenseActions';
import {FlashList} from '@shopify/flash-list';
import {Pressable, StatusBar, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import {palette} from '../../constants/theme/palette';
import {useSelector} from 'react-redux';

const TransactionList = () => {
  //local state
  const [currentTab, setCurrentTab] = useState('expense');
  const profileId = useSelector(state => state?.auth?.userDetails?.profileId);
  const {data, isLoading} = useGetAllExpensesQuery({
    type: currentTab,
    profileId,
  });
  return (
    <View style={styles.mainContainer}>
      <Box style={styles.amountLeft(currentTab)}></Box>
      <Box style={styles.listContainer}>
        <View style={styles.tabs}>
          <HStack space={3}>
            <Pressable onPress={() => setCurrentTab('expense')}>
              <Text
                fontSize={'md'}
                fontWeight={currentTab === 'expense' ? 'medium' : ''}>
                Expenses
              </Text>
            </Pressable>
            <Pressable onPress={() => setCurrentTab('income')}>
              <Text
                fontSize={'md'}
                fontWeight={currentTab === 'income' ? 'medium' : ''}>
                Earnings
              </Text>
            </Pressable>
          </HStack>
          {/* Use filter icon instead of text */}
          <Text fontSize={'md'}>Filters</Text>
        </View>
        <View style={styles.container}>
          <FlashList
            keyExtractor={(item, index) => {
              return item?._id || index;
            }}
            contentContainerStyle={styles.bottomStyle}
            data={data || Array(8).fill(Math.floor(Math.random() * 15) + 1)}
            extraData={{currentTab}}
            renderItem={({item}) => (
              <RenderItem
                item={item}
                isLoaded={!isLoading}
                currentTab={currentTab}
              />
            )}
            estimatedItemSize={15}
          />
        </View>
      </Box>
    </View>
  );
};

export const Transactions = memo(TransactionList);

const RenderItem = ({item, isLoaded, currentTab}) => {
  const amountColor = useMemo(
    () =>
      currentTab === 'expense' ? palette.expense.main : palette.income.main,
    [currentTab],
  );

  return (
    <View style={styles.flexHorizontal}>
      <Skeleton h={70} w={70} borderRadius={10} isLoaded={isLoaded}>
        <FastImage
          source={{uri: item?.file}}
          style={styles.imageStyle}
          resizeMode={FastImage.resizeMode.cover}
        />
      </Skeleton>
      <Box style={styles.subContainer}>
        <View style={styles.detailsContainer}>
          <Skeleton.Text lines={1} px={1} w={50} isLoaded={isLoaded}>
            <Text fontSize={'xl'} fontWeight={'semibold'}>
              {item?.category?.charAt(0)?.toUpperCase() +
                item?.category?.substring(1)}
            </Text>
          </Skeleton.Text>
          <Skeleton.Text lines={1} px={1} isLoaded={isLoaded}>
            <Text fontSize={'xs'} fontWeight={'thin'}>
              {item?.description}
            </Text>
          </Skeleton.Text>
        </View>
        <View style={[styles.detailsContainer, styles.columnEnd]}>
          <Skeleton.Text px={1} lines={1} isLoaded={isLoaded}>
            <Text
              fontSize={'xl'}
              fontWeight={'semibold'}
              textAlign={'center'}
              color={amountColor}>
              {`${currentTab === 'expense' ? '-' : '+'}${item?.amount}`}
            </Text>
          </Skeleton.Text>
          <Skeleton.Text px={2} lines={1} isLoaded={isLoaded}>
            <Text fontSize={'xs'} fontWeight={'thin'}>
              {dayjs(item?.createdAt).format('MMM DD, YYYY')}
            </Text>
          </Skeleton.Text>
        </View>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomStyle: {
    paddingBottom: 90,
  },
  flexHorizontal: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 1,
    columnGap: 10,
  },
  imageStyle: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    // width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  columnEnd: {
    alignItems: 'flex-end',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  mainContainer: {
    flex: 1,
  },
  amountLeft: tab => ({
    height: 150,
    backgroundColor: palette?.[tab]?.main,
  }),
  listContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  tabs: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
});
