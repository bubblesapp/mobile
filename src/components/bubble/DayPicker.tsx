import React, {useState} from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {customTheme} from '../../theme/theme';
import moment, {Moment} from 'moment';
import I18n from '../../i18n';
import _ from 'lodash';

const daysDiff = (m: Moment) => moment().diff(m.startOf('day'), 'days');

const daysAgoString = (m: Moment): string => {
  const days = daysDiff(m);
  switch (days) {
    case 0:
      return _.upperFirst(I18n.t('bubble.friends.today'));
    case 1:
      return _.upperFirst(I18n.t('bubble.friends.yesterday'));
    default:
      return I18n.t('bubble.friends.xDaysAgo').replace('$0', days.toString());
  }
};

type Props = {
  onChange?: (date: Date) => void;
};

export const DayPicker: React.FC<Props> = (props) => {
  const [timestamp, setTimestamp] = useState(moment().unix());
  const mo = moment.unix(timestamp);
  const canAdd = daysDiff(mo) > 0;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          const newMo = mo.subtract(1, 'day');
          setTimestamp(newMo.unix());
          props.onChange && props.onChange(newMo.toDate());
        }}>
        <Icon
          name={'chevron-thin-left'}
          type={'entypo'}
          size={16}
          color={customTheme.colors.ctaBackground}
        />
      </TouchableOpacity>
      <View style={styles.dayContainer}>
        <Text style={styles.daysAgo}>{daysAgoString(mo)}</Text>
        <Text style={styles.date}>
          {_.upperFirst(mo.format(I18n.t('bubble.friends.dayPickerFormat')))}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.buttonContainer, !canAdd && {opacity: 0.2}]}
        disabled={!canAdd}
        onPress={() => {
          const newMo = mo.add(1, 'day');
          setTimestamp(newMo.unix());
          props.onChange && props.onChange(newMo.toDate());
        }}>
        <Icon
          name={'chevron-thin-right'}
          type={'entypo'}
          size={16}
          color={customTheme.colors.ctaBackground}
        />
      </TouchableOpacity>
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  buttonContainer: ViewStyle;
  dayContainer: ViewStyle;
  daysAgo: TextStyle;
  date: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200,
    marginTop: 32,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: customTheme.colors.lightGrayer,
    borderRadius: 16,
    width: 32,
    height: 32,
  },
  dayContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysAgo: {
    color: customTheme.colors.mediumGray,
    fontFamily: customTheme.boldFontFamily,
  },
  date: {
    color: customTheme.colors.gray,
    fontFamily: customTheme.boldFontFamily,
  },
});
