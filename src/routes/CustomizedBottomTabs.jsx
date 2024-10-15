import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import {Iconify} from 'react-native-iconify';
import {Home} from '../pages/auth/Home';
import {Transactions} from '../pages/transactions/Transactions';
import {Budget} from '../pages/budget/Budget';
import {Profile} from '../pages/profile/Profile';
import {useSpinAnimation} from '../utils/useAnimations';

const bottomTabDefaultColor = 'rgb(127,61,255)';
export default function CustomizedBottomTabs({navigation}) {
  // Local State
  const [isCircleClicked, setIsCircleClicked] = useState(false);
  const [spinValue, startSpin] = useSpinAnimation({
    value: 0,
    outputRange: ['0deg', '90deg'],
    reversible: true,
  });
  const extraCircleButtons = useMemo(() => {
    return [
      {
        name: 'income',
        order: 1,
        icon: <Iconify icon={'uil:money-withdraw'} color="#fff" size={35} />,
        style: {
          backgroundColor: '#00A86B',
          bottom: 30,
          zIndex: 0,
        },
        data: {
          title: 'Income',
          color: '#00A86B',
        },
        position: {
          halt: {
            x: 0,
            y: 0,
          },
          move: {
            x: -70,
            y: -50,
          },
        },
      },
      {
        name: 'expense',
        order: 2,
        icon: <Iconify icon={'uil:money-insert'} color="#fff" size={35} />,
        style: {
          backgroundColor: '#FD3C4A',
          bottom: 30,
          zIndex: 0,
        },
        data: {
          title: 'Expense',
          color: '#FD3C4A',
        },
        position: {
          halt: {
            x: 0,
            y: 0,
          },
          move: {
            x: 70,
            y: -50,
          },
        },
      },
      {
        name: 'transfer',
        order: 3,
        icon: (
          <Iconify
            icon={'material-symbols:currency-exchange-rounded'}
            color="#fff"
            size={35}
          />
        ),
        style: {
          backgroundColor: '#0077FF',
          bottom: 30,
          zIndex: 0,
        },
        position: {
          halt: {
            x: 0,
            y: 0,
          },
          move: {
            x: 0,
            y: -100,
          },
        },
        data: {
          title: 'Transfer',
          color: '#0077FF',
        },
      },
    ];
  }, []);

  const onCircleClicked = () => {
    startSpin();
    setIsCircleClicked(prev => !prev);
  };
  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'Dashboard':
        icon = (
          <Iconify
            icon={'iconamoon:home-fill'}
            size={25}
            color={routeName === selectedTab ? bottomTabDefaultColor : 'gray'}
          />
        );
        break;
      case 'Transactions':
        icon = (
          <Iconify
            icon={'icon-park-solid:transaction-order'}
            size={25}
            color={routeName === selectedTab ? bottomTabDefaultColor : 'gray'}
          />
        );
        break;
      case 'Profile':
        icon = (
          <Iconify
            icon={'iconamoon:profile-circle-fill'}
            size={25}
            color={routeName === selectedTab ? bottomTabDefaultColor : 'gray'}
          />
        );
        break;
      case 'Budget':
        icon = (
          <Iconify
            icon={'solar:wallet-money-bold'}
            size={25}
            color={routeName === selectedTab ? bottomTabDefaultColor : 'gray'}
          />
        );
        break;
    }

    return (
      <View style={styles.tabbarItemInner}>
        {icon}
        <Text style={styles?.textStyle(routeName === selectedTab)}>
          {routeName}
        </Text>
      </View>
    );
  };
  const renderTabBar = ({routeName, selectedTab}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsCircleClicked(false);
          navigation?.navigate(routeName);
        }}
        style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={65}
      circleWidth={60}
      bgColor="white"
      initialRouteName="Dashboard"
      borderTopLeftRight
      renderCircle={() => (
        <View style={styles.circlesContainer}>
          <Animated.View
            style={[
              styles.btnCircleUp,
              {
                transform: [{rotate: spinValue}],
              },
            ]}>
            <TouchableOpacity style={styles.button} onPress={onCircleClicked}>
              <Iconify icon={'fluent:add-28-filled'} color="#fff" size={30} />
            </TouchableOpacity>
          </Animated.View>
          {extraCircleButtons?.map(value => (
            <AnimatedCircles
              key={value?.name}
              value={value}
              navigation={navigation}
              isCircleClicked={isCircleClicked}
            />
          ))}
        </View>
      )}
      tabBar={renderTabBar}>
      <CurvedBottomBar.Screen
        name="Dashboard"
        position="LEFT"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <CurvedBottomBar.Screen
        name="Transactions"
        component={Transactions}
        position="RIGHT"
        options={{
          headerShown: false,
          statusBarColor: 'rgb(127,61,255)',
        }}
      />
      <CurvedBottomBar.Screen
        name="Budget"
        component={Budget}
        position="LEFT"
        options={{
          headerShown: false,
        }}
      />
      <CurvedBottomBar.Screen
        name="Profile"
        component={Profile}
        position="RIGHT"
        options={{
          headerShown: false,
        }}
      />
    </CurvedBottomBar.Navigator>
  );
}

function AnimatedCircles({value, navigation, isCircleClicked}) {
  const positionValue = useRef(
    new Animated.ValueXY({
      x: value?.position?.halt?.x,
      y: value?.position?.halt?.y,
    }),
  ).current;

  useEffect(() => {
    const action = isCircleClicked ? 'move' : 'halt';
    Animated.spring(positionValue, {
      toValue: {
        x: value?.position?.[action]?.x,
        y: value?.position?.[action]?.y,
      },
      ...(isCircleClicked
        ? {
            friction: 10,
            tension: 200,
          }
        : {
            speed: 80,
            bounciness: 5,
          }),
      useNativeDriver: true,
    }).start();
  }, [positionValue, value, isCircleClicked]);

  return (
    <Animated.View
      style={[
        styles?.extraButtons(value?.style),
        {
          transform: [
            {
              translateX: positionValue?.x,
            },
            {
              translateY: positionValue?.y,
            },
          ],
        },
      ]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation?.navigate('AddExpense', {
            ...value?.data,
          });
        }}>
        {value?.icon}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  textStyle: condition => ({
    color: condition ? bottomTabDefaultColor : 'gray',
    fontSize: 12,
  }),
  extraButtons: extra => ({
    height: 60,
    width: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 27,
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    ...extra,
  }),
  circlesContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bottomTabDefaultColor,
    shadowColor: '#000',
    bottom: 27,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    zIndex: 1,
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabbarItemInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
