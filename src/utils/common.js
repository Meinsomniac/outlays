import dayjs from 'dayjs';
import React from 'react';
import {Iconify} from 'react-native-iconify';

export function isNumber(evt) {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

export const delay = secs =>
  new Promise(resolve => {
    setTimeout(() => resolve(''), secs * 1000);
  });

export const getAlertIcon = (type, size) => {
  let icon;
  switch (type) {
    case 'success':
      icon = <Iconify icon="mdi:tick-circle" color={'seagreen'} size={size} />;
      break;
    case 'error':
      icon = (
        <Iconify
          icon="material-symbols:error"
          color={'firebrick'}
          size={size}
        />
      );
      break;
    case 'info':
      icon = (
        <Iconify icon="bi:info-circle-fill" color={'royalblue'} size={size} />
      );
      break;
    case 'warning':
      icon = (
        <Iconify
          icon="ant-design:warning-filled"
          color={'darkorange'}
          size={size}
        />
      );
      break;
    default:
      icon = <Iconify icon="mdi:tick-circle" color={'seagreen'} size={25} />;
      break;
  }
  return icon;
};

export const frequencyOptions = [
  {
    title: 'Yearly',
    value: 'yr',
  },
  {
    title: 'Monthly',
    value: 'mon',
  },
  {
    title: 'Daily',
    value: 'daily',
  },
  {
    title: 'Custom',
    value: 'custom',
  },
];

export const formatDate = (date, format) => {
  return dayjs(date).format(format || 'MMM DD, YYYY');
};
