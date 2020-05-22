import {InputProps} from 'react-native-elements';

export type CustomTheme = {
  Input: InputProps;
  colors: {[key: string]: string};
  fontFamily: string;
  boldFontFamily: string;
  blackFontFamily: string;
};

export const customTheme: CustomTheme = {
  Input: {
    inputContainerStyle: {
      borderColor: '#fff',
    },
    placeholderTextColor: '#ccc',
  },
  colors: {
    lightGray: '#eee',
    lightGrayer: '#e4e4e4',
    mediumGray: '#aaa',
    gray: '#3C3A39',
    ctaBackground: '#314DCB',
    ctaBackgroundLight: 'rgba(72, 101, 233, 0.2)',
    ctaText: '#fff',
    lightBlue: '#E3F4FF',
    darkBlue: '#080C71',
    pink: '#FFE0DF',
    success: '#5cb85c',
    green: '#7AE0A6',
    orange: '#FF824E',
    red: '#FB6054',
    shadow: 'rgba(0,0,0,0.1)',
  },
  fontFamily: 'Nunito',
  boldFontFamily: 'Nunito-Bold',
  blackFontFamily: 'Nunito-Black',
};
