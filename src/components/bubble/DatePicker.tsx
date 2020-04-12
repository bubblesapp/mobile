import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import I18n from '../../i18n';

type Props = {
  visible: boolean;
  onDatePicked: (date: Date) => void;
  onCancel: () => void;
};

export const DatePicker: React.FC<Props> = ({
  visible,
  onDatePicked,
  onCancel,
}) => {
  const now = new Date();
  return (
    <DateTimePickerModal
      headerTextIOS={I18n.t('bubble.friends.whenDidYouLastMeet')}
      mode={'date'}
      date={now}
      isVisible={visible}
      maximumDate={now}
      onConfirm={(date) => onDatePicked(date)}
      onCancel={() => onCancel()}
    />
  );
};
